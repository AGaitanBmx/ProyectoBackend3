const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/mocks', require('./routes/mocks.router'));
app.use('/api/users', require('./routes/users.router'));
app.use('/api/pets', require('./routes/pets.router'));

module.exports = app;