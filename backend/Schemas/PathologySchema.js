const mongoose = require("mongoose");
// console.log(user-icon)
const PathologySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    established: {
        type: Number,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});



module.exports = mongoose.model('Pathology', PathologySchema);