const cassandra = require('./index').client;

const findVideosById = (user_id) => {
  const previouslyWatched = `SELECT * from watch_list.videos where user_id = ${user_id} and previously_watched = true;`;
  const currentlyWatching = `SELECT * from watch_list.videos where user_id = ${user_id} and previously_watched = false;`;
  const playList = {};
  return cassandra.execute(previouslyWatched).then((result)=>{
    playList.previouslyWatched = result.rows;
  }).then(() => {
    return cassandra.execute(currentlyWatching ).then((result) =>{
      playList.currentlyWatching = result.rows;
    }).then(() => {
      return playList;
    });
  });
};

module.exports = {
  findVideosById
};