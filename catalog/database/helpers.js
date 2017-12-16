let table = require('./index.js');


let retrieveContentByGenre = function(genreType, callback) {
	table.Genre
	  .forge()
	  .where('name', '=', genreType)
	  .query()
	  .select()
	  .then(function(model) {
	  	let genre_id = model[0].id;
	  	table.Content
	  	  .forge()
	  	  .where('genre_id', '=', genre_id)
	  	  .query()
	  	  .select()
	  	  .limit(40)
	  	  .then(function(model) {
	  	  	callback(model);
	  	  })
	  })
}

let getSimilarContent = function(name, callback) {

}

module.exports.retrieveContentByGenre = retrieveContentByGenre;
