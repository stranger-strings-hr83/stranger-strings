const cassandra = require('cassandra-driver');

const client = new cassandra.Client({queryOptions: { consistency: cassandra.types.consistencies.one }, contactPoints: ['127.0.0.1'], keyspace: 'watch_list'});
client.connect(function(reply, err) {
   console.log(reply);
});
const fakeData = [
  {
    id: 1,
    title: 'Lion King',
    box_shot: 'img.com'
  }, 
  {
    id: 2,
    title: 'Coco',
    box_shot: 'img.com'
  }, 
  {
    id: 3,
    title: 'StepBrothers',
    box_shot: 'img.com'
  }, 
  {
    id: 4,
    title: 'The Incredibles',
    box_shot: 'img.com'
  }, 
  {
    id: 5,
    title: 'The Shape of Water',
    box_shot: 'img.com'
  }, 
  {
    id: 6,
    title: 'Pan\'s Labrynth',
    box_shot: 'img.com'
  }, 
];

async function insertIntoCassandra(data) {
  const query = 'INSERT INTO watch_list.videos(account_id, content_id, title, box_shot,previously_watched) VALUES (?,?,?,?,?)';
  for (var i = 1; i <= 10000000; i++) {
    const batch = [];
    for (var j = 0; j < data.length; j++) {
      if (j < data.length / 2) {
        var previously_watched = true;
      } else {
        var previously_watched = false;
      }
      batch.push({query, params : [i, data[j].id, data[j].title, data[j].box_shot, previously_watched]})
    }
    await client.batch(batch, {prepare: true}).then((result) =>{
      console.log('done', i);
    });
  }
};

module.exports = {
  client
}


