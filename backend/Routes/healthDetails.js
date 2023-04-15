const express = require('express');
const router = express.Router();
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');
const fetchuser = require('../Middlewares/fetchuser');
const HealthDetails = require('../Schemas/HealthDetails');

router.post('/get/data', fetchuser, async (req, res) => {
    try {
        let date = new Date(req.body.date)
        let predate = new Date(req.body.date)
        date.setDate(predate.getDate() + 2);
        predate.setDate(predate.getDate() - 7);
        // console.log(date )
        // console.log(predate)
        const find = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })
        const findAll = await HealthDetails.find({
            $and: [{ seniorId: find.id }, {
                date: {
                    $lte: date + 1,
                    $gt: predate
                }
            }]
        })

        // console.log(findAll)
        res.status(200).json(findAll)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

module.exports = router