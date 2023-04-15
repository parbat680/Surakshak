const mongoose = require("mongoose");
// console.log(user-icon)
const NgoSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    ngoType: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('Ngo', NgoSchema);