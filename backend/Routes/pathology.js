const express = require('express');
const DoctorSchema = require('../Schemas/DoctorSchema');
const PathologySchema = require('../Schemas/PathologySchema');
const auth = require('../Authentication/GetBearerToken')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const fetchuser = require('../Middlewares/fetchuser');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newLab = new PathologySchema({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            established: req.body.established,
            email: req.body.email,
            regNo: req.body.regNo,
            password: req.body.password
        })

        const saved = await newLab.save()
        // console.log(saved)
        newLab.password = undefined;
        const newLabToken = {
            name: newLab.name,
            email: newLab.email
        }
        const jsontoken = await auth.tokenGenerate(newLabToken, req, res);
        res.status(200).json({
            message: "Pathology added succesfully",
            token: jsontoken
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const userFind = await PathologySchema.findOne({ email: req.body.email })
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

module.exports = router