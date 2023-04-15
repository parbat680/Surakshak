var cron = require('node-cron');
const HealthDetails = require('./Schemas/HealthDetails');

cron.schedule('* 6 * * *', async () => {
    console.log('running a task every minute');
    const find = await HealthDetails.find();
    const date = new Date().getDate - 1
    if (date != find[find.length - 1].date.getDate) {
        const newDeatils = new HealthDetails({
            seniorId: find.id,
            bloodPressure: {
                sistolic: req.body.sistolic ? req.body.sistolic : -1,
                diastolic: req.body.diastolic ? req.body.diastolic : -1
            },
            pulse: req.body.pulse ? req.body.pulse : -1,
            date: new Date()
        })

        const saved = await newDeatils.save();
        console.log(saved)
    }
});