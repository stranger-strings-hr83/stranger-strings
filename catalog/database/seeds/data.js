const genre = require('../data/genre'); 

// const first = require('./batchFile.js');
// For movie generation
const moviesOne = require('../data/movie_titlesOne.json');
const moviesTwo = require('../data/movie_titlesTwo.json');
const moviesThree = require('../data/movie_titlesThree.json');
const movies = [];
for (var i = 0; i < moviesOne.length; i++) {
  for (var j = 0; j < moviesTwo.length; j++) {
    for (var k = 0; k < moviesThree.length; k++) {
      movies.push(moviesOne[i].name + moviesTwo[j].name + moviesThree[k].name);
    }
  }
}
let current = 0;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    let catalogPromises = [];
  return knex('genre').del()
    .then(() => {
      // Populate genre table
      for (let i = 0; i < genre.length; i++) {
        catalogPromises.push(createGenre(knex, genre[i]));
      }
     return Promise.all(catalogPromises);
    })
    .then(() => {
      let first = [];
      console.log('Inserting 2mil!');
      for (var i = 0; i < 2000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 4mil!');
      for (var i = 2000000; i < 4000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 6mil!');
      for (var i = 4000000; i < 6000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 7mil!');
      for (var i = 6000000; i < 7000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 8mil!');
      for (var i = 7000000; i < 8000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 8.5mil!');
      for (var i = 8000000; i < 8500000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 9mil!');
      for (var i = 8500000; i < 9000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 9.5mil!');
      for (var i = 9000000; i < 9500000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    .then(() => {
      let first = [];
      console.log('Inserting 9.5mil!');
      for (var i = 9500000; i < 10000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
      }
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
};


const createGenre = (knex, genre) => {
  return knex('genre').insert({
    name: genre
  });
}

const batchContent = (knex, number, contentList) => {
  let content = [];
  for (var i = 0; i < number; i++) {
    let obj = generateRandomContentVars();
    content.push(createContent(knex, contentList[i].name, obj.year, obj.run_time, obj.genre_id))
  }
  return Promise.all(content);
}


const generateRandomContentVars = () => {
  var obj = {};
  // Random genreID generator
  const min = 1;
  const max = Math.floor(genre.length + 1)
  const genreID = Math.floor(Math.random() * (max - min)) + min;

  // Random year generator
  const minYear = 1920;
  const maxYear = Math.floor(2018)
  const year = Math.floor(Math.random() * (maxYear - minYear)) + minYear;

  // Generate random minutes
  const minMins = 20;
  const maxMins = Math.floor(130)
  const run_time = Math.floor(Math.random() * (maxMins - minMins)) + minMins;
  obj.genre_id = genreID;
  obj.year = year;
  obj.run_time = run_time;
  return obj;
}

const createContent = (knex, name, year, run_time, genre_id) => {
  return knex('content').insert({
    name: name,
    year: year,
    run_time: run_time,
    genre_id: genre_id
  });
}