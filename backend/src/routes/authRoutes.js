const express = require('express');
const { login, signUp, registerDriver } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/driver/register', registerDriver);

module.exports = router;
