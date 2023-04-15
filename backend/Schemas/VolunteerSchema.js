const mongoose = require("mongoose");
// console.log(user-icon)
const VolunteerSchema = mongoose.Schema({
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
});



module.exports = mongoose.model('Volunteer', VolunteerSchema);