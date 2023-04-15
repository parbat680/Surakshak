const mongoose = require("mongoose");
// console.log(user-icon)
const VolunteerMapSchema = mongoose.Schema({
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer'

    },
    seniorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seniors'

    }
});



module.exports = mongoose.model('Volunteermap', VolunteerMapSchema);