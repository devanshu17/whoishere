// models/User.js
const mongoose = require('mongoose');

const SocialSchema = new mongoose.Schema({
    linkedIn: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    github: {
        type: String
    },
    other: {
        type: String
    }
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    social: {
        type: SocialSchema
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
