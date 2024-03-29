const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Todo extends Model {}

Todo.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        todo_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        day_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'day',
                key: 'id'
            }
        },
        completed : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'todo'
    }
);

module.exports = Todo;