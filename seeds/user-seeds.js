const {User} = require('../models/index.js');
const crypto = require('crypto');

const userData = [
    {
        username: 'Chase',
        password: 'password12345',
        salt: crypto.randomBytes(16).toString('hex')
    },
    {
        username: 'Shelby',
        password: 'password12345',
        salt: crypto.randomBytes(16).toString('hex')
    },
    {
        username: 'Will',
        password: 'password12345',
        salt: crypto.randomBytes(16).toString('hex')
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;