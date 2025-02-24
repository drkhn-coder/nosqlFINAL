const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    }
}, { timestamps: true });

// Устанавливаем TTL-индекс на 60 секунд
taskSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 60 });

module.exports = mongoose.model('Task', taskSchema);
