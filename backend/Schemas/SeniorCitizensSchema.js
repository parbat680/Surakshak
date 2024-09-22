const mongoose = require("mongoose");
// console.log(user-icon)
const SeniorCitizensSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    uniqueId: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    otpVerified: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Seniors', SeniorCitizensSchema);