const User = require('../models/user'); // Импортируем модель пользователя

// Получить профиль пользователя
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Ищем пользователя в БД, исключая пароль
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user); // Отправляем данные пользователя
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Обновить профиль пользователя
const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body; // Получаем данные из запроса

    // Проверяем, есть ли пользователь
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Обновляем данные
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save(); // Сохраняем изменения

    res.json({ message: 'Профиль обновлён', user });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
