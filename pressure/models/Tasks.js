const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {type: String, require: true},
    dueDate: {type: Date, require: true, default: new Date().getDate()},
    description: {type: String}
},
{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;