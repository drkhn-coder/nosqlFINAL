const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Функция создания JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Регистрация пользователя
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Проверяем, есть ли уже такой пользователь
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });

        // Создаём нового пользователя
        const user = await User.create({ name: username, email, password });
        console.log(user)
        res.status(201).json({
            message: 'Пользователь зарегистрирован',
            user: { id: user._id, name: user.name, email: user.email },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка регистрации', error: error.message });
    }
};

// Авторизация пользователя
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Проверяем, существует ли пользователь
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Неверные учетные данные' });

        
        // Сравниваем пароли
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Неверные учетные данные' });
        token = generateToken(user._id)
        console.log(token)
        res.json({
            message: 'Авторизация успешна',
            user: { id: user._id, name: user.name, email: user.email },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка авторизации', error: error.message });
        console.log(error)
    }
};

module.exports = { registerUser, loginUser };
