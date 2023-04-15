const express = require('express');
const router = express.Router();
const multer = require('../Middlewares/multer')
const fetchuser = require('../Middlewares/fetchuser');
const MedicineSchema = require('../Schemas/MedicineSchema');
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');

router.post('/add', fetchuser, multer.upload.single('image'), async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })
        const newMedicine = new MedicineSchema({
            seniorId: userFind.id,
            name: req.body.name,
            days: req.body.days,
            time: req.body.time,
            duration: parseInt(req.body.duration),
            image: `${process.env.URI}api/image/${req.file.filename}`
        })

        const saved = await newMedicine.save()
        console.log(saved)
        res.status(200).json(saved)
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
        const findMedicines = await MedicineSchema.find({ seniorId: userFind.id })
        res.status(200).json(findMedicines)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

module.exports = router