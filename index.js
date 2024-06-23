// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware to parse JSON
app.use(express.json());

// Simple route to test server
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Create a Simple Mongoose Model
const User = require('./models/User');

// Create a new user
app.post('/register/users', async (req, res) => {
    try {
        const { name, email, password, social } = req.body;
        const newUser = new User({ name, email, password, social });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
