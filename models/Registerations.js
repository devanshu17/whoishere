const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationsSchema = mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventid:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['attendee', 'speaker', 'organizer'], 
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    }
});

const Registrations = mongoose.model('Registrations', RegistrationsSchema);

module.exports = Registrations;