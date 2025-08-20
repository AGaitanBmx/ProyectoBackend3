const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// GET /api/pets
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find().populate('owner');
        res.json({
            status: 'success',
            payload: pets
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;