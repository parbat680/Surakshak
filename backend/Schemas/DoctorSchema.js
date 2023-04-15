const mongoose = require("mongoose");
// console.log(user-icon)
const DoctorSchema = mongoose.Schema({
    seniorId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seniors'
    }],
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
    password: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },

});



module.exports = mongoose.model('Doctor', DoctorSchema);