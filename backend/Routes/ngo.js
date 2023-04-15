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

router.post('/login', async (req, res) => {
    try {
        const userFind = await NgoSchema.findOne({ email: req.body.email })
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

module.exports = router