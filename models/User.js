const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class User extends Model {}
const crypto = require('crypto');

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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
        },
        hashed_password: {
        type: DataTypes.STRING,
        allowNull: false
        },
        notes: {
        type: DataTypes.STRING,
        allowNull: false
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                const hashedPassword = crypto.createHash('sha256').update(newUserData.password).digest('hex');
                newUserData.password = hashedPassword;
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                const hashedPassword = crypto.createHash('sha256').update(updatedUserData.password).digest('hex');
                updatedUserData.password = hashedPassword;
                return updatedUserData;
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
    );

module.exports = User;
