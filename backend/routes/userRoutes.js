const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateProfileUpdate } = require('../middleware/validationMiddleware'); // Импортируем валидацию

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, validateProfileUpdate, updateUserProfile); // Добавили middleware валидации

module.exports = router;
