const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class User extends Model {}
const crypto = require('crypto');
const pbkdf2 = require('util').promisify(crypto.pbkdf2);

User.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false
        },
        password: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: {
            len: [4]
        }
        },
        salt: {
        type: DataTypes.STRING,
        allowNull: false
        },
        // hashed_password: {
        // type: DataTypes.STRING,
        // allowNull: false
        // },
        notes: {
        type: DataTypes.STRING,
        allowNull: true
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
              const salt = crypto.randomBytes(16).toString('hex');
              const hashedPassword = (await pbkdf2(newUserData.password, salt, 310000, 32, 'sha256')).toString('hex');
              newUserData.password = hashedPassword;
              newUserData.salt = salt;
              return newUserData;
            },
            async beforeUpdate(updatedUserData) {
              const salt = crypto.randomBytes(16).toString('hex');
              const hashedPassword = (await pbkdf2(updatedUserData.password, salt, 310000, 32, 'sha256')).toString('hex');
              updatedUserData.password = hashedPassword;
              updatedUserData.salt = salt;
              return updatedUserData;
            }
          },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
    );

module.exports = User;
