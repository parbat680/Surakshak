// const mongoose = require("mongoose");
// // console.log(user-icon)
// const hospitalSchema = mongoose.Schema({
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     regNo: {
//         type: String,
//         required: true
//     },
//     latitude: {
//         type: String,
//         required: true
//     },
//     longitude: {
//         type: String,
//         required: true
//     }
// });


// module.exports = mongoose.model('Hospital', hospitalSchema);


const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
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
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    }
});

// Create a geospatial index on the location field
hospitalSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hospital', hospitalSchema);