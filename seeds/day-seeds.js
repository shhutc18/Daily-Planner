const Day = require('../models/Day');

const dayData = [
    {
        date: '2021-02-01',
        user_id: 1,
        event_id: 1,
        todo_id: 1
    },
    {
        date: '2021-02-02',
        user_id: 2,
        event_id: 2,
        todo_id: 2
    },
    {
        date: '2021-02-03',
        user_id: 3,
        event_id: 3,
        todo_id: 3
    }
]

const seedDays = () => Day.bulkCreate(dayData);

module.exports = seedDays;