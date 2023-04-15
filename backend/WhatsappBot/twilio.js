// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// require('dotenv/config')
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;    
// const client = require('twilio')(accountSid, authToken);
require('dotenv/config');
console.log(process.env.TWILIO_ACCOUNT_SID)
console.log(process.env.TWILIO_AUTH_TOKEN)
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)


client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: 'Hello, there!',
        to: 'whatsapp:+919082632827'
    })
    .then(message => console.log(message.sid));
