require('dotenv/config');
const express = require('express');
const fetchuser = require('../Middlewares/fetchuser');
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');
const VolunteerMap = require('../Schemas/VolunteerMap');
const HospitalSchema = require('../Schemas/HospitalSchema');
const router = express.Router();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

router.post('/fire', fetchuser, async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })

        const volunteers = await VolunteerMap.find({ seniorId: userFind.id }).populate('volunteerId')
        if (req.body.condition == 'severe') {
            flag = true
            const hospitals = await HospitalSchema.findOne({ address: { $regex: `${req.body.address}`, $options: 'i' } })
            // console.log(hospitals)
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: `Hello, there is an emergency with ${userFind.name}.It is ${req.body.condition}. Kindly come asap!`,
                    to: `whatsapp:${hospitals.phone}`
                })
                .then(message => console.log(message.sid));
        }
        // console.log(volunteers)
        for (let i = 0; i < volunteers.length; i++) {
            // console.log(volunteers[i].volunteerId.phone)
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: `Hello, there is an emergency with ${userFind.name}.It is ${req.body.condition}. Kindly send amubulance asap!`,
                    to: `whatsapp:${volunteers[i].volunteerId.phone}`
                })
                .then(message => console.log(message.sid));
        }
        res.status(200).json("Succesfully fired SOS!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

module.exports = router