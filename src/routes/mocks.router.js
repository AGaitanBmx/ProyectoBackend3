const express = require('express');
const router = express.Router();
const MockingModule = require('../utils/mockingModule');
const User = require('../models/User');
const Pet = require('../models/Pet');

// Endpoint GET /mockingpets (del desafío anterior)
router.get('/mockingpets', (req, res) => {
    try {
        const pets = MockingModule.generateMockPets(50);
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

// Endpoint GET /mockingusers
router.get('/mockingusers', async (req, res) => {
    try {
        const users = await MockingModule.generateMockUsers(50);
        res.json({
            status: 'success',
            payload: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Endpoint POST /generateData
router.post('/generateData', async (req, res) => {
    try {
        const { users: userCount, pets: petCount } = req.body;
        
        if (!userCount || !petCount) {
            return res.status(400).json({
                status: 'error',
                message: 'Se requieren los parámetros "users" y "pets"'
            });
        }

        // Generar usuarios
        const mockUsers = await MockingModule.generateMockUsers(userCount);
        const insertedUsers = await User.insertMany(mockUsers);

        // Generar mascotas y asignar owners
        const mockPets = MockingModule.generateMockPets(petCount);
        const usersIds = insertedUsers.map(user => user._id);
        
        const petsWithOwners = mockPets.map(pet => ({
            ...pet,
            owner: usersIds[Math.floor(Math.random() * usersIds.length)]
        }));

        const insertedPets = await Pet.insertMany(petsWithOwners);

        // Actualizar usuarios con las mascotas
        for (const pet of insertedPets) {
            await User.findByIdAndUpdate(
                pet.owner,
                { $push: { pets: pet._id } }
            );
        }

        res.json({
            status: 'success',
            message: `Se insertaron ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas`,
            data: {
                users: insertedUsers.length,
                pets: insertedPets.length
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;