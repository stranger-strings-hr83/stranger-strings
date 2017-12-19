const cassandra = require('cassandra-driver');
const uuidv4 = require('uuid/v4');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });

client.connect((err) => {
  if (err) {
    console.log('Error connecting to Cassandra Client');
  } else {
    console.log('Connected successfully to Cassandra Client');
  }
});

const addEvent = (eventToAdd, callback) => {
  const uniqueEventId = uuidv4();
  const {
    event,
    userId,
    contentId,
    type,
  } = eventToAdd;
  const query = 'INSERT INTO userevents (id_event, event, id_user, id_content, type) VALUES(?, ?, ?, ?, ?)';
  const params = [uniqueEventId, event, userId, contentId, type];
  client.execute(query, params, { prepare: true }).then(callback('Event was added to the database!'));
};

module.exports.addEvent = addEvent;
