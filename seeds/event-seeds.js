const Event = require('../models/Events');

const eventData = [
    {
        event_name: 'Birthday Party',
        event_date: '2021-05-01',
        event_time: '12:00:00',
        event_location: '123 Main St, Springfield, IL',
        user_id: 1
    },
    {
        event_name: 'Wedding',
        event_date: '2021-06-01',
        event_time: '12:00:00',
        event_location: '123 Main St, Springfield, IL',
        user_id: 2
    },
    {
        event_name: 'Graduation',
        event_date: '2021-07-01',
        event_time: '12:00:00',
        event_location: '123 Main St, Springfield, IL',
        user_id: 3
    }
]

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;