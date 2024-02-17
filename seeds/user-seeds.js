const User = require('../models/User');

const userData = [
    {
        username: 'Chase',
        password: 'password12345'
    },
    {
        username: 'Shelby',
        password: 'password12345'
    },
    {
        username: 'Will',
        password: 'password12345'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;