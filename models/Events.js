const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
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
        event_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        event_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_length: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'day',
                key: 'id'
            }
        },
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
