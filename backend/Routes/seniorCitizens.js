const express = require('express');
const router = express.Router();
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');
const auth = require('../Authentication/GetBearerToken')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const generateUniqueId = require('generate-unique-id');
const fetchuser = require('../Middlewares/fetchuser');
const HealthDetails = require('../Schemas/HealthDetails');
const mailer = require('../mailhandelling/auth');


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/signup', async (req, res) => {
    try {
        const id = generateUniqueId();
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const otp = generateOTP(); // Generate OTP

        const newUser = new SeniorCitizensSchema({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            password: req.body.password,
            uniqueId: id,
            otp: otp // Store OTP in the new entry
        });

        const saved = await newUser.save();
        await mailer.sendOtp(otp, req.body.email);

        res.status(200).json({
            message: "User Signup Successful!",
            uniqueId: saved.uniqueId,
            // otp: saved.otp // Return OTP in the response
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { uniqueId, otp } = req.body;

        // Find the user by uniqueId
        const user = await SeniorCitizensSchema.findOne({ uniqueId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the provided OTP matches the stored OTP
        if (user.otp === Number(otp)) {
            // Update the otpVerified field to true
            user.otpVerified = true;
            await user.save();

            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

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

// router.get('/get', fetchuser, async (req, res) => {
//     try {
//         // console.log(req.user)
//         const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })
//         // console.log(userFind)
//         res.status(200).json(userFind)
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).json(err.message);
//     }
// })


// router.post('/add/healthdetails', fetchuser, async (req, res) => {
//     try {
//         const findUser = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })

//         const newDeatils = new HealthDetails({
//             seniorId: findUser.id,
//             bloodPressure: {
//                 sistolic: req.body.sistolic ? req.body.sistolic : -1,
//                 diastolic: req.body.diastolic ? req.body.diastolic : -1
//             },
//             pulse: req.body.pulse ? req.body.pulse : -1,
//             date: new Date()
//         })

//         const saved = await newDeatils.save();
//         // console.log(saved)
//         res.status(200).json("Details saved succesfully!")
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).json(err.message);
//     }
// })

// Login Route
// router.post('/login', async (req, res) => {
//     try {
//         const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.body.id });
//         if (!userFind) {
//             return res.status(401).json({
//                 message: "Unauthorized access!"
//             });
//         }

//         if (!userFind.otpVerified) {
//             return res.status(401).json({ message: "OTP not verified" });
//         }

//         // Compare provided password with stored hashed password
//         const isPasswordValid = compareSync(req.body.password, userFind.password);
//         console.log(isPasswordValid);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid password" });
//         }

//         userFind.password = undefined;
//         const newUserToken = {
//             name: userFind.name,
//             uniqueId: userFind.uniqueId
//         };
//         console.log("Token:", newUserToken);
//         const jsontoken = await auth.tokenGenerate(newUserToken, req, res);
//         console.log("JWT: ", jsontoken);
//         return res.status(200).json({
//             success: 1,
//             message: "Successful login",
//             token: jsontoken,
//         });
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json(err.message);
//     }
// });

// Get User Route
router.get('/get', fetchuser, async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId });
        if (!userFind.otpVerified) {
            return res.status(401).json({ message: "OTP not verified" });
        }
        res.status(200).json(userFind);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

// Add Health Details Route
router.post('/add/healthdetails', fetchuser, async (req, res) => {
    try {
        const findUser = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId });
        if (!findUser.otpVerified) {
            return res.status(401).json({ message: "OTP not verified" });
        }

        const newDetails = new HealthDetails({
            seniorId: findUser.id,
            bloodPressure: {
                sistolic: req.body.sistolic ? req.body.sistolic : -1,
                diastolic: req.body.diastolic ? req.body.diastolic : -1
            },
            pulse: req.body.pulse ? req.body.pulse : -1,
            date: new Date()
        });

        const saved = await newDetails.save();
        res.status(200).json("Details saved successfully!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

module.exports = router