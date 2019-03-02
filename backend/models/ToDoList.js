const mongoose = require('mongoose');

const ToDoListSchema = new mongoose.Schema({
    title: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    list: [{
        type: Object,
    }],
});

const ToDoList = mongoose.model('ToDoList', ToDoListSchema);
module.exports = ToDoList;