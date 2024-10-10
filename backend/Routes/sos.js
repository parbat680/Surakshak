require('dotenv/config');
const express = require('express');
const fetchuser = require('../Middlewares/fetchuser');
const SeniorCitizensSchema = require('../Schemas/SeniorCitizensSchema');
const VolunteerMap = require('../Schemas/VolunteerMap');
const HospitalSchema = require('../Schemas/HospitalSchema');
const router = express.Router();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
// const accountSid = 'AC556c5f29a1a095c7798a52f873c90836';
// const authToken = 'c1dd61de8ad045e63ed630379cf4c892';


// const client = require('twilio')(accountSid, authToken);

router.post('/fire', fetchuser, async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })

        const volunteers = await VolunteerMap.find({ seniorId: userFind.id }).populate('volunteerId')
        console.log("first")
        if (req.body.condition == 'Severe') {
            console.log("inside")
            flag = true
            const hospitals = await HospitalSchema.findOne({ address: { $regex: `${req.body.address}`, $options: 'i' } })
            console.log(hospitals)
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: `Hello, there is an emergency with ${userFind.name}.It is ${req.body.condition}. Kindly send amubulance asap!`,
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
                    body: `Hello, there is an emergency with ${userFind.name}.It is ${req.body.condition}. Kindly come asap!`,
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



router.post('/firenow', fetchuser, async (req, res) => {
    try {
        const userFind = await SeniorCitizensSchema.findOne({ uniqueId: req.user.uniqueId })
        // const volunteers = await VolunteerMap.find({ seniorId: userFind.id }).populate('volunteerId')

        console.log("first")
        console.log("User::", userFind);

        if (req.body.condition == 'Severe') {
            console.log("inside");
            flag = true;

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
            const maxDistance = 50000; // Maximum distance in meters

            // Find the nearest hospital based on latitude and longitude
            const hospitals = await HospitalSchema.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: maxDistance
                    }
                }
            });

            console.log(hospitals);

            let nearestHospital = null;
            let minDistance = maxDistance;

            // Iterate through the hospitals to find the nearest one
            hospitals.forEach(hospital => {
                const distance = calculateDistance(latitude, longitude, hospital.location.coordinates[1], hospital.location.coordinates[0]);
                console.log("=====================================");
                console.log("Hospital coordinates:", hospital.location.coordinates[1], hospital.location.coordinates[0]);
                console.log("Req coordinates:", latitude, longitude);
                console.log(hospital.name, " = ", distance);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestHospital = hospital;
                }
            });

            if (nearestHospital) {
                console.log("Nearest Hospital: ", nearestHospital);
                // Uncomment the following lines to send a WhatsApp message
                client.messages
                    .create({
                        from: 'whatsapp:+14155238886',
                        body: `Hello, there is an emergency with ${userFind.name}. It is ${req.body.condition}. Kindly send ambulance asap!`,
                        to: `whatsapp:${nearestHospital.phone}`
                    })
                    .then(message => console.log(message.sid));
            }
        }



        // // If the condition is severe, then send a message to the hospital as well 
        // if (req.body.condition == 'Severe') {
        //     console.log("inside")
        //     flag = true
        //     const hospitals = await HospitalSchema.findOne({ address: { $regex: `${req.body.address}`, $options: 'i' } })
        //     console.log(hospitals)
        //     client.messages
        //         .create({
        //             from: 'whatsapp:+14155238886',
        //             body: `Hello, there is an emergency with ${userFind.name}.It is ${req.body.condition}. Kindly send amubulance asap!`,
        //             to: `whatsapp:${hospitals.phone}`
        //         })
        //         .then(message => console.log(message.sid));
        // }
        // // console.log(volunteers)
        // for (let i = 0; i < volunteers.length; i++) {
        //     // console.log(volunteers[i].volunteerId.phone)
        //     client.messages
        //         .create({
        //             from: 'whatsapp:+14155238886',
        //             body: `Hello, there is an emergency with ${userFind.name}.It is ${req.body.condition}. Kindly come asap!`,
        //             to: `whatsapp:${volunteers[i].volunteerId.phone}`
        //         })
        //         .then(message => console.log(message.sid));
        // }
        res.status(200).json("Succesfully fired SOS!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})



// function calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371e3; // Radius of the Earth in meters
//     const φ1 = lat1 * Math.PI / 180;
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const distance = R * c; // Distance in meters
//     return distance;
// }


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180; // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in km

    console.log(distance)
    return distance;
}

module.exports = router