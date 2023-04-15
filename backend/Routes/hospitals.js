const express = require('express');
const router = express.Router();
const HospitalSchema = require('../Schemas/HospitalSchema');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const auth = require('../Authentication/GetBearerToken')

router.post('/signup', async (req, res) => {
    try {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newHospital = new HospitalSchema({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            password: req.body.password,
            regNo: req.body.regNo
        })

        const saved = await newHospital.save();

        newHospital.password = undefined;
        const newHospitalToken = {
            name: newHospital.name,
            email: newHospital.email
        }
        const jsontoken = await auth.tokenGenerate(newHospitalToken, req, res);
        res.status(200).json({
            message: "Hospital added succesfully",
            token: jsontoken
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

module.exports = router