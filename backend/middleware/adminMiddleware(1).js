// middleware/adminMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Получаем пользователя из БД
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = adminMiddleware;
