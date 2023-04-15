const mongoose = require("mongoose");
// console.log(user-icon)
const medicineSchema = mongoose.Schema({
    seniorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seniors'
    },
    name: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
});



module.exports = mongoose.model('Medicine', medicineSchema);