const User = require('./User');
const Events = require('./Events');
const Tasks = require('./Tasks');

User.hasMany(Events, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Events.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Tasks, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Tasks.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Events, Tasks };