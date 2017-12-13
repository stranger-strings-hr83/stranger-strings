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

      // let first = [];
      // for (var i = 0; i < 100; i++) {
      //   var obj = generateRandomContentVars();
      //   obj.name = movies[i];
      //   first.push(obj);
      //   // console.log(first);
      // }
      // // console.log('KNEX', knex);
      // // knex.batchInsert('content', genre);
      // knex.transaction(function(tr) {
      //   return knex.batchInsert('content', first)
      //   .transacting(tr)
      // })
      // // Populate content table
      // for (let name = 0; name < current + 100000; name++) {
      //   const obj = generateRandomContentVars(); 
      //   catalogPromises.push(createContent(knex, movies[name], obj.year, obj.run_time, obj.genreID));
      // }
     return Promise.all(catalogPromises);
    })
    .then(() => {
      let first = [];
      for (var i = 0; i < 2000000; i++) {
        var obj = generateRandomContentVars();
        obj.name = movies[i];
        first.push(obj);
        // console.log(first);
      }
      // console.log('KNEX', knex);
      // knex.batchInsert('content', genre);
      return knex.transaction(function(tr) {
        return knex.batchInsert('content', first)
        .transacting(tr)
      })

    })
    // .then(() => {
    //   let catalogPromises = [];
    //   current += 100000;
    //   for (let name = current; name < current + 100000; name++) {
    //     const obj = generateRandomContentVars(); 
    //     catalogPromises.push(createContent(knex, movies[name], obj.year, obj.run_time, obj.genreID));
    //   }
    //   return Promise.all(catalogPromises);

    // });
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