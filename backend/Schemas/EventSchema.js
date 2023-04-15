const mongoose = require("mongoose");
// console.log(user-icon)
const EventSchema = mongoose.Schema({
    organiserEmail: {
        type: String,
        // unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    organiser: {
        type: String,
        required: true
    },
    organiserPhone: {
        type: String,
        // unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    facilities: {
        type: String,
        // required: true
    },
    duration: {
        type: String,
        required: true
    },
    food: {
        type: Boolean,
        required: true
    },
    pick: {
        type: Boolean,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image:{
        type:String,
    }
});



module.exports = mongoose.model('Event', EventSchema);