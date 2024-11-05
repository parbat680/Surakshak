const cron = require('node-cron')

const MedicineSchema = require('../Schemas/MedicineSchema')
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
// const accountSid = 'AC556c5f29a1a095c7798a52f873c90836';
// const authToken = 'c1dd61de8ad045e63ed630379cf4c892';


// const client = require('twilio')(accountSid, authToken);


async function getCronTimeFromDate(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const cronTime = `${minute} ${hour} * * *`;
    return cronTime;
}

async function sendWhatsAppMessage(phoneNumber, message) {
    try {
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: message,
                to: `whatsapp:${phoneNumber}`
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        console.error(`Error sending message to ${phoneNumber}:`, error);
    }
}


async function scheduleMessages() {
    console.log("Inside schedule")
    // Get the current date and time
    const now = new Date();

    // Query the database for all users and their custom times
    const users = await MedicineSchema.find().populate('seniorId');
    // console.log(users)
    // Schedule the sending of messages for each user
    for (let i = 0; i < users.length; i++) {
        // Parse the custom time from the database
        const [hours, minutes] = users[i].time.split(':').map(Number);

        // Calculate the time to send the message
        const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        const cronTime = await getCronTimeFromDate(scheduledTime);
        // console.log(cronTime)
        // Schedule the message to be sent at the custom time
        cron.schedule(cronTime, () => {
            sendWhatsAppMessage(users[i].seniorId.phone, `Its time to take your medicine named ${users[i].name}`);
            console.log(users[i].seniorId.phone, `Its time to take your medicine named ${users[i].name}`)
            console.log(`Message scheduled for ${users[i].seniorId.phone} at ${scheduledTime}`);
        });
    }
}


// scheduleMessages();
// setInterval(scheduleMessages, 40000); // Run once per day (24 hours)