const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, searchTasks, getTaskCountByStatus, getAverageCompletionTime } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const { filterTasks } = require('../controllers/taskController');

// Все маршруты защищены с помощью authMiddleware
router.post('/', authMiddleware, createTask);      // Создать задачу
router.get('/', authMiddleware, getTasks);         // Получить задачи
router.put('/:id', authMiddleware, updateTask);    // Обновить задачу
router.delete('/:id', authMiddleware, deleteTask); // Удалить задачу
router.get('/search', authMiddleware, searchTasks); // Поиск задач
router.get('/filter', authMiddleware, filterTasks ); // Фильтрация и сортировка
router.get('/stats/status-count', authMiddleware, getTaskCountByStatus);
router.get('/stats/average-completion-time', authMiddleware, getAverageCompletionTime);

module.exports = router;
