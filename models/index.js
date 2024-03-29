const User = require('./User');
const Event = require('./Event');
const Todo = require('./Todo');
const Day = require('./Day');

Day.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Day, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(Day, {
    foreignKey: 'day_id'
});

Day.hasMany(Event, {
    foreignKey: 'day_id',
    onDelete: 'CASCADE'
});

Todo.belongsTo(Day, {
    foreignKey: 'day_id'
});

Day.hasMany(Todo, {
    foreignKey: 'day_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Event, Todo, Day};