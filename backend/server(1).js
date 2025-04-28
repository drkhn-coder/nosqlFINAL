require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const path = require('path');
const userRoutes = require('./routes/userRoutes');
// Подключение к MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/users', userRoutes); // Все маршруты внутри userRoutes теперь доступны через /users

app.use(express.static(path.join(__dirname, '../frontend')));

// Проверка работы сервера
app.get('/', (req, res) => {
    res.send('🚀 Сервер работает!');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));
