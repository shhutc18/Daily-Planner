const User = require('./User');
const Events = require('./Events');
const Todo = require('./Todo');
const Day = require('./Day');

Day.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Day, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Events.belongsTo(Day, {
    foreignKey: 'day_id'
});

Day.hasMany(Events, {
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

module.exports = { User, Events, Todo, Day};