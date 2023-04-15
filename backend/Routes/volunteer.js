const express = require('express');
const router = express.Router();
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');
const auth = require('../Authentication/GetBearerToken')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const generateUniqueId = require('generate-unique-id');
const fetchuser = require('../Middlewares/fetchuser')
const VolunteerSchema = require('../Schemas/VolunteerSchema');
const VolunteerMap = require('../Schemas/VolunteerMap');


router.post('/signup', async (req, res) => {
    try {
        // console.log(req.body.password)
        const id = generateUniqueId();
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newUser = new VolunteerSchema({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            password: req.body.password,
        })

        const saved = await newUser.save()
        // console.log(saved)
        newUser.password = undefined;
        const newUserToken = {
            name: newUser.name,
            email: newUser.email
        }
        const jsontoken = await auth.tokenGenerate(newUserToken, req, res);
        res.status(200).json({
            message: "User Signup Successfull!",
            token: jsontoken
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const userFind = await VolunteerSchema.findOne({ email: req.body.email })
        if (!userFind) {
            return res.status(200).json("Invalid Credentials!")
        }
        const result = compareSync(req.body.password, userFind.password)
        if (result) {
            userFind.password = undefined;
            const newUser = {
                email: userFind.email,
                name: userFind.name,
            }
            const jsontoken = await auth.tokenGenerate(newUser, req, res);
            return res.status(200).json({
                success: 1,
                message: "Successful signup",
                token: jsontoken,
            });
        }
        else {
            res.status(402).json("Invalid Credentials!")
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post("/add", fetchuser, async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.body.id })
        const volunteerFind = await VolunteerSchema.findOne({ email: req.user.email })
        // console.log(userFind._id)
        // console.log(volunteerFind._id)
        if (!userFind) {
            return res.status(200).json("Invalid id!")
        }
        const newUser = new VolunteerMap({
            seniorId: userFind.id,
            volunteerId: volunteerFind.id
        })
        const saved = await newUser.save()
        // console.log(saved)
        res.status(200).json("Volunteer added successfully")
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.get('/get', fetchuser, async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })
        // console.log(userFind)
        const volunteers = await VolunteerMap.find({ seniorId: userFind.id }).populate('volunteerId')
        // console.log(volunteers)
        res.status(200).json(volunteers)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/display/patients', fetchuser, async (req, res) => {
    try {
        const find = await VolunteerSchema.findOne({ email: req.user.email })
        const findAll = await VolunteerMap.find({ volunteerId: find.id }).populate('seniorId')
        // console.log(findAll)
        res.status(200).json(findAll)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

module.exports = router