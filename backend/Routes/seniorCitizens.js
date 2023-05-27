const express = require('express');
const router = express.Router();
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');
const auth = require('../Authentication/GetBearerToken')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const generateUniqueId = require('generate-unique-id');
const fetchuser = require('../Middlewares/fetchuser');
const HealthDetails = require('../Schemas/HealthDetails');


router.post('/signup', async (req, res) => {
    try {
        // console.log(req.body.password)
        const id = generateUniqueId();
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newUser = new SeniorCitizensSchema({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            password: req.body.password,
            uniqueId: id
        })

        const saved = await newUser.save()
        // console.log(saved)
        res.status(200).json({
            message: "User Signup Successfull!",
            uniqueId: saved.uniqueId
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.body.id })
        if (userFind) {
            userFind.password = undefined;
            const newUserToken = {
                name: userFind.name,
                uniqueId: userFind.uniqueId
            }
            const jsontoken = await auth.tokenGenerate(newUserToken, req, res);
            return res.status(200).json({
                success: 1,
                message: "Successful login",
                token: jsontoken,
            });
        }
        else {
            res.status(401).json({
                message: "Unauthorized access!"
            })
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.get('/get', fetchuser, async (req, res) => {
    try {
        // console.log(req.user)
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })
        // console.log(userFind)
        res.status(200).json(userFind)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})


router.post('/add/healthdetails', fetchuser, async (req, res) => {
    try {
        const findUser = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })

        const newDeatils = new HealthDetails({
            seniorId: findUser.id,
            bloodPressure: {
                sistolic: req.body.sistolic ? req.body.sistolic : -1,
                diastolic: req.body.diastolic ? req.body.diastolic : -1
            },
            pulse: req.body.pulse ? req.body.pulse : -1,
            date: new Date()
        })

        const saved = await newDeatils.save();
        // console.log(saved)
        res.status(200).json("Details saved succesfully!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})
module.exports = router