const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    qrlink:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Integer,
        required: false
    },
    website:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Event', EventSchema);
