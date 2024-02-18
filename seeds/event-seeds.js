const {Events} = require('../models/index.js');

const eventData = [
    {
        event_name: 'Work',
        event_time: '08:00:00',
        event_location: 'Office',
        event_length: 480,
        day_id: 1
    },
    {
        event_name: 'Lunch',
        event_time: '12:00:00',
        event_location: 'Cafeteria',
        event_length: 60,
        day_id: 1
    },
    {
        event_name: 'Work',
        event_time: '08:00:00',
        event_location: 'Office',
        event_length: 480,
        day_id: 2
    },
    {
        event_name: 'Lunch',
        event_time: '12:00:00',
        event_location: 'Cafeteria',
        event_length: 60,
        day_id: 2
    },
    {
        event_name: 'Work',
        event_time: '08:00:00',
        event_location: 'Office',
        event_length: 480,
        day_id: 3
    },
    {
        event_name: 'Lunch',
        event_time: '12:00:00',
        event_location: 'Cafeteria',
        event_length: 60,
        day_id: 3
    }
]

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;