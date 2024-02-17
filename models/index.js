const User = require('./User');
const Events = require('./Events');
const Todo = require('./Todo');
const Notes = require('./Notes');

User.hasMany(Events, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Events.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Todo, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Todo.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Notes, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Notes.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Events, Todo, Notes };