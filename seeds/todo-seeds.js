const {Todo} = require('../models/index.js');

const todoData = [
    {
        todo_name: 'Get groceries',
        day_id: 1,
        completed: false,
    },
    {
        todo_name: 'Do laundry',
        day_id: 1,
        completed: false,
    },
    {
        todo_name: 'Finish homework',
        day_id: 2,
        completed: false,
    },
    {
        todo_name: 'Clean bathroom',
        day_id: 3,
        completed: false,
    },
    {
        todo_name: 'Go for a run',
        day_id: 4,
        completed: false,
    },
    {
        todo_name: 'Call mom',
        day_id: 5,
        completed: false,
    },
    {
        todo_name: 'Read a book',
        day_id: 6,
        completed: false,
    },
    {
        todo_name: 'Write a letter',
        day_id: 7,
        completed: false,
    },
];

const seedTodos = () => Todo.bulkCreate(todoData);

module.exports = seedTodos;