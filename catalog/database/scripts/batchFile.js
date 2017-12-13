var knex = require('../../../knexfile.js');
const genre = require('../data/genre');
const moviesOne = require('../data/movie_titlesOne.json');
const moviesTwo = require('../data/movie_titlesTwo.json');
const moviesThree = require('../data/movie_titlesThree.json');
const content = [];
for (var i = 0; i < moviesOne.length; i++) {
  for (var j = 0; j < moviesTwo.length; j++) {
    for (var k = 0; k < moviesThree.length; k++) {
      content.push(moviesOne[i].name + moviesTwo[j].name + moviesThree[k].name);
    }
  }
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

let firstBatch = content.splice(0, 100);
let first = [];
for (var i = 0; i < 100; i++) {
	var obj = generateRandomContentVars();
	obj.name = content[i];
	first.push(obj);
	// console.log(first);
}

// knex.batchInsert('content', first);
// console.log(first.length);
	// knex.batchInsert('content', )