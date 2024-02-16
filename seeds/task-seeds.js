const Task = require('../models/Tasks');

const taskData = [
    {
        task_name: 'Grocery Shopping',
        task_date: '2021-05-01',
        task_time: '12:00:00',
        task_location: '123 Main St, Springfield, IL',
        user_id: 1
    },
    {
        task_name: 'Laundry',
        task_date: '2021-06-01',
        task_time: '12:00:00',
        task_location: '123 Main St, Springfield, IL',
        user_id: 2
    },
    {
        task_name: 'Clean Garage',
        task_date: '2021-07-01',
        task_time: '12:00:00',
        task_location: '123 Main St, Springfield, IL',
        user_id: 3
    }
]

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;