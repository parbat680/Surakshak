const express = require('express');
const router = express.Router();
const HospitalSchema = require('../Schemas/HospitalSchema');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const NgoSchema = require('../Schemas/NgoSchema');
const auth = require('../Authentication/GetBearerToken')

router.post('/signup', async (req, res) => {
    try {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newNgo = new NgoSchema({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            password: req.body.password,
            regNo: req.body.regNo,
            ngoType: req.body.ngoType,
        })

        const saved = await newNgo.save();
        newNgo.password = undefined;
        const newNgoToken = {
            name: newNgo.name,
            email: newNgo.email
        }
        const jsontoken = await auth.tokenGenerate(newNgoToken, req, res);
        res.status(200).json({
            message: "Ngo added succesfully",
            token: jsontoken
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

module.exports = router