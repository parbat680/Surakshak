const express = require('express');
const DoctorSchema = require('../Schemas/DoctorSchema');
const router = express.Router();
const auth = require('../Authentication/GetBearerToken');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const fetchuser = require('../Middlewares/fetchuser');
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');

router.post('/signup', async (req, res) => {
    try {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newDoc = new DoctorSchema({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            experience: req.body.experience,
            email: req.body.email,
            password: req.body.password
        })

        const saved = await newDoc.save()
        console.log(saved)
        newDoc.password = undefined;
        const newDocToken = {
            name: newDoc.name,
            email: newDoc.email
        }
        const jsontoken = await auth.tokenGenerate(newDocToken, req, res);
        res.status(200).json({
            message: "Doctor added succesfully",
            token: jsontoken
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const userFind = await DoctorSchema.findOne({ email: req.body.email })
        if (userFind) {
            const result = compareSync(req.body.password, userFind.password)
            if (result) {

                userFind.password = undefined;
                const newUserToken = {
                    name: userFind.name,
                    email: userFind.email
                }
                const jsontoken = await auth.tokenGenerate(newUserToken, req, res);
                return res.status(200).json({
                    success: 1,
                    message: "Successful signup",
                    token: jsontoken,
                });
            }
            else {
                // console.log(err.message)
                return res.status(403).json({
                    error: {
                        message: "Username or Password Invalid!"
                    }
                })
            }
        }
        else {
            return res.status(403).json({
                error: {
                    message: "Username or Password Invalid!"
                }
            })
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/autologin', fetchuser, async (req, res) => {
    try {
        // const t = await req.user;
        // console.log(req.user[0].booking[0]);
        res.json({
            message: 'Post created',
            // s: t
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/add/patient', fetchuser, async (req, res) => {
    try {
        const findOne = await DoctorSchema.findOne({ email: req.user.email })
        const find = await SeniorCitizensSchema.findOne({ uniqueId: req.body.uniqueId })
        let patients = []
        // console.log(findOne.seniorId)
        patients = findOne.seniorId
        // console.log(find.id)
        patients.push(find.id)
        // console.log(patients)

        const saved = await DoctorSchema.updateOne({ email: req.user.email }, {
            $set: {
                seniorId: patients
            }
        })
        console.log(saved)
        res.status(200).json("Patient added succesfully")
    } catch (error) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})


router.get('/get/patients', fetchuser, async (req, res) => {
    try {
        const find = await DoctorSchema.find({ email: req.user.email }).populate('seniorId')
        // console.log(find)
        res.status(200).json(find)

    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})


module.exports = router