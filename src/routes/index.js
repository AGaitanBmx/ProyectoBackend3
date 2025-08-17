const { Router } = require('express');
const usersRouter = require('./users.router');
const petsRouter = require('./pets.router');
const mocksRouter = require('./mocks.router');


const router = Router();


router.use('/users', usersRouter);
router.use('/pets', petsRouter);
router.use('/mocks', mocksRouter);


module.exports = router;