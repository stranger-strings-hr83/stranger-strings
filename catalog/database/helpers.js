let table = require('./index.js');


let retrieveContentByGenre = (genreType, callback) => {
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

let getSimilarContent = (name, callback) => {
	table.Content
	  .forge()
	  .where('name', 'LIKE', '%' + name + '%')
	  .query()
	  .select()
	  .limit(10)
	  .then(function(model) {
	  	console.log(model);
	  	callback(model);
	  })
}

let updateTotalViews = (content_id, callback) => {
	// Select from Content by ID
	// table.knex('movies')
	// .where('content_id', '=', content_id)
	// .increment('total_views', 1);

	table.Movies.query()
	.where('content_id', '=', content_id)
	.increment('total_views', 1)
	.then(function(model) {
		callback(model);
	});
} 

module.exports.retrieveContentByGenre = retrieveContentByGenre;
module.exports.getSimilarContent = getSimilarContent;
module.exports.updateTotalViews = updateTotalViews;
