const nodemailer = require('nodemailer')
//const fs = require('fs')
const path = require('path')
async function sendOtp(otp, email) {
    //htmlfile = fs.readFileSync(path.resolve(__dirname,'./emailverif.html'))
    let transporter = nodemailer.createTransport(
        {

            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "uniexsfit@gmail.com", //add acc
                pass: "ldzqwdcawbqijags"//change
            }
        }
    );


    try {
        let info = await transporter.sendMail({
            from: 'Surakshak <opfrost81@gmail.com>',
            to: email,
            subject: "OTP verification",
            text: "Your otp is " + otp + " do not reply"
        })
        console.log("message has been sent: %s", info.messageId);
    } catch (err) {
        console.log(err)
    }
}

//sendOtp("341JKAD", "jasonsampy88@gmail.com")
module.exports = { sendOtp };