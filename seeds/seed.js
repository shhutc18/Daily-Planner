const seedUsers = require('./user-seeds');
const seedEvents = require('./event-seeds');
const seedTodos = require('./todo-seeds');
const seedDays = require('./day-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedDays();
  console.log('\n----- DAYS SEEDED -----\n');

  await seedEvents();
  console.log('\n----- EVENTS SEEDED -----\n');

  await seedTodos();
  console.log('\n----- TODOS SEEDED -----\n');

  process.exit(0);
};

seedAll();
