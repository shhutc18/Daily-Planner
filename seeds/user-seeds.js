const User = require('../models/User');

const userData = [
    {
        username: 'Ricky',
        password: 'password123'
    },
    {
        username: 'Bobby',
        password: 'password123'
    },
    {
        username: 'Cindy',
        password: 'password123'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;