const cassandra = require('cassandra-driver');
const bluebird = require('bluebird');
const uuidv4 = require('uuid/v4');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });

client.connect((err, result) => {
  if (err) {
    console.log('Error connecting');
  } else {
    console.log('Connected successfully');
  }
});

let randomNumberGeneratorInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min));
};

let createEvents = (numberOfEventsToCreate, numberOfEventsToAdd) => {
  let queries = [];
  while (queries.length < numberOfEventsToCreate) {
    const contentEventType = ['click', 'play', 'pause', 'thumbs up', 'thumbs down'];
    const contentType = ['show', 'movie'];
    let randomUser = randomNumberGeneratorInclusive(0, (numberOfEventsToAdd * 0.3));

    let randomContent = randomNumberGeneratorInclusive(0, 2500);
    let randomContentType = contentType[randomNumberGeneratorInclusive(0, contentType.length)];
    let randomContentEvent = contentEventType[randomNumberGeneratorInclusive(0, contentEventType.length)];

    let newContentEvent = [uuidv4(), randomContentEvent, randomUser, randomContent, randomContentType];
    queries.push(newContentEvent);
    if (randomContentEvent === 'pause') {
      let newPlayEvent = [uuidv4(), 'play', randomUser, randomContent, randomContentType];
      queries.push(newPlayEvent);
    }
  }
  return queries;
};

async function addEvents() {
  let createdEvents = await createEvents(500, 10000);
  saveEvents(createdEvents);
};

var counter = 0;
async function saveEvents(eventArray) {
  var query = 'INSERT INTO userevents (id_event, event, id_user, id_content, type) VALUES (?,?,?,?,?)';
  let batch = [];
  for (var i = 0; i < eventArray.length; i++) {
    batch.push({ query, params: [eventArray[i][0], eventArray[i][1], eventArray[i][2], eventArray[i][3], eventArray[i][4]] });
  }
  await client.batch(batch, { prepare: true }).then(result => {
    counter += 500;
    if (counter <= 10000000) {
      addEvents();
      console.log(counter);
    }
  });
};

addEvents();