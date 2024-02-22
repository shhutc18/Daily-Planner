const {User} = require('../models/index.js');

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