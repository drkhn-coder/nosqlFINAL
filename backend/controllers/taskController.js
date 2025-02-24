const Task = require('../models/Task');

// ✅ Создать задачу
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = await Task.create({
            user: req.user.id, // Извлекаем id из токена
            title,
            description,
            status,
            dueDate,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании задачи', error: error.message });
    }
};

// ✅ Получить все задачи пользователя
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении задач', error: error.message });
    }
};

// ✅ Обновить задачу
const updateTask = async (req, res) => {
    try {
        const { id } = req.params; // Получаем id из URL
        const { title, description, completed } = req.body; // Данные для обновления

        // Ищем задачу по id и обновляем
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Задача не найдена' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении задачи', error });
    }
};

// ✅ Удалить задачу
// Удалить задачу
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Получаем id из URL

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Задача не найдена' });
        }

        res.status(200).json({ message: 'Задача удалена', deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении задачи', error });
    }
};

const filterTasks = async (req, res) => {
    try {
      const { completed, sortBy } = req.query;
  
      const filter = {};
      if (completed) filter.completed = completed === 'true';
  
      const sortOptions = {};
      if (sortBy === 'date') sortOptions.createdAt = -1; // Сортировка по дате (новые сверху)
  
      const tasks = await Task.find(filter).sort(sortOptions);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при фильтрации задач', error });
    }
  };
//Этот маршрут будет возвращать количество задач в каждом статусе.
  const getTaskCountByStatus = async (req, res) => { 
    try {
        const taskCounts = await Task.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(taskCounts);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении количества задач по статусу', error: error.message });
    }
};
  // Поиск задач по текстовому индексу
const searchTasks = async (req, res) => {
    try {
      const { query } = req.query; // Берём запрос из query-параметров
      const tasks = await Task.find({ $text: { $search: query } });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при поиске задач', error });
    }
  };

  const getAverageCompletionTime = async (req, res) => {
    try {
        const averageTime = await Task.aggregate([
            {
                $match: { status: 'завершено' }
            },
            {
                $project: {
                    duration: { $subtract: ['$updatedAt', '$createdAt'] }
                }
            },
            {
                $group: {
                    _id: null,
                    averageDuration: { $avg: '$duration' }
                }
            }
        ]);
        res.status(200).json(averageTime);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при вычислении среднего времени выполнения', error: error.message });
    }
};

  module.exports = {getAverageCompletionTime, getTaskCountByStatus, filterTasks, searchTasks, createTask, getTasks, updateTask, deleteTask };
