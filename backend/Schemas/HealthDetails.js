const mongoose = require("mongoose");
// console.log(user-icon)
const HealthDetailsSchema = mongoose.Schema({
    seniorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seniors'
    },
    bloodPressure: {
        sistolic: {
            type: Number
        },
        diastolic: {
            type: Number
        },
    },
    pulse: {
        type: Number
    },
    date: {
        type: Date,
        required: true
    }
});



module.exports = mongoose.model('HealthDetails', HealthDetailsSchema);