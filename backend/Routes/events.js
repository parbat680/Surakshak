const express = require('express')
const router = express.Router();
const fetchuser = require('../Middlewares/fetchuser');
const EventSchema = require('../Schemas/EventSchema');
const NgoSchema = require('../Schemas/NgoSchema')
const multer = require('../Middlewares/multer')

router.post('/add', fetchuser, multer.upload.single('image'), async (req, res) => {
    try {
        // console.log(req.user)
        const userFind = await NgoSchema.findOne({ email: req.user.email })
        // console.log(userFind)
        const newEvent = new EventSchema({
            organiserEmail: req.user.email,
            name: req.body.name,
            day: req.body.day,
            date: req.body.date,
            organiser: req.body.name,
            organiserPhone: userFind.phone,
            address: req.body.address,
            facilities: req.body.facilities,
            duration: req.body.duration,
            food: req.body.food,
            pick: req.body.pick,
            desc: req.body.desc,
            image: `${process.env.URI}api/image/${req.file.filename}`
        })


        const saved = await newEvent.save()
        res.status(200).json(saved)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

router.post('/get', fetchuser, async (req, res) => {
    try {
        const getEvents = await EventSchema.find({ address: { $regex: `${req.body.address}`, $options: 'i' } })
        res.status(200).json(getEvents)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

module.exports = router