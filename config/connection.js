// Import the Sequelize constructor from the sequelize library
const Sequelize = require('sequelize');

// Import dotenv package to read and set any environment variables
require('dotenv').config();

// Declare a variable to hold our Sequelize instance
let sequelize;

// Check if the application is running on Heroku and using the JawsDB add-on
if (process.env.JAWSDB_URL) {
  // If so, initialize Sequelize to connect to the JawsDB database
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If not, initialize Sequelize to connect to a local MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // MySQL username
    process.env.DB_PASSWORD, // MySQL user password
    {
      host: 'localhost', // Database host
      dialect: 'mysql', // Use the MySQL dialect
      port: 3306 // Default MySQL port
    }
  );
}

// Export the sequelize object for use in other parts of our application
module.exports = sequelize;