const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Day extends Model {}

Day.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'id'
            }
        },
        todo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'todo',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'day'
    }
);  