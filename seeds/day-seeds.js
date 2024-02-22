const {Day} = require('../models/index.js');

const dayData = [
    {
        date: '2021-02-01',
        user_id: 1,
    },
    {
        date: '2021-02-02',
        user_id: 1,
    },
    {
        date: '2021-02-03',
        user_id: 1,
    },
    {
        date: '2021-02-04',
        user_id: 1,
    },
    {
        date: '2021-02-05',
        user_id: 2,
    },
    {
        date: '2021-02-06',
        user_id: 2,
    },
    {
        date: '2021-02-07',
        user_id: 2,
    },
    {
        date: '2021-02-08',
        user_id: 3,
    },
    {
        date: '2021-02-09',
        user_id: 2,
    },
    {
        date: '2021-02-10',
        user_id: 3,
    },

]

const seedDays = () => Day.bulkCreate(dayData);

module.exports = seedDays;