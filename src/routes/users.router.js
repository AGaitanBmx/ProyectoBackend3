const { Router } = require('express');
const User = require('../models/user.model');


const router = Router();


// GET /api/users
router.get('/', async (req, res) => {
try {
const limit = parseInt(req.query.limit || '50', 10);
const users = await User.find().select('-password').limit(limit).populate('pets').lean();
res.json({ status: 'success', count: users.length, payload: users });
} catch (err) {
console.error(err);
res.status(500).json({ status: 'error', message: 'Error fetching users' });
}
});


// GET /api/users/:id
router.get('/:id', async (req, res) => {
try {
const user = await User.findById(req.params.id).select('-password').populate('pets').lean();
if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
res.json({ status: 'success', payload: user });
} catch (err) {
console.error(err);
res.status(500).json({ status: 'error', message: 'Error fetching user' });
}
});


module.exports = router;