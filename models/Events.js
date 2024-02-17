const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const e = require('express');

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        event_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        event_location: {
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
        modelName: 'event'
    }
);

module.exports = Event;
