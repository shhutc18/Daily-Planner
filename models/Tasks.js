const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tasks extends Model {}

Tasks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        task_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        task_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        task_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        task_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tasks'
    }
);

module.exports = Tasks;