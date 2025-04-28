const Joi = require('joi');

// 📌 Схема валидации для обновления профиля
const profileSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(), // Имя пользователя (минимум 3 символа)
  email: Joi.string().email().optional(), // Email должен быть корректным
});

// 📌 Middleware для проверки данных
const validateProfileUpdate = (req, res, next) => {
  const { error } = profileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // Если всё ок, передаём управление дальше
};

// 📌 Схема валидации для регистрации
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(), // Имя пользователя (минимум 3 символа)
    email: Joi.string().email().required(), // Email должен быть корректным
    password: Joi.string().min(6).required(), // Пароль минимум 6 символов
  });

  // 📌 Схема валидации для логина
const loginSchema = Joi.object({
    email: Joi.string().email().required(), // Email обязателен
    password: Joi.string().required(), // Пароль обязателен
  });

  // 📌 Middleware для валидации регистрации
const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // Если валидация прошла, передаём управление дальше
};

// 📌 Middleware для валидации логина
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
module.exports = { validateRegister, validateLogin, validateProfileUpdate };
