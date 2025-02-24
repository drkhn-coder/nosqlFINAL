const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware'); // Импортируем валидацию

router.post('/register', validateRegister, registerUser); // Добавили валидацию
router.post('/login', validateLogin, loginUser); // Добавили валидацию

module.exports = router;
1