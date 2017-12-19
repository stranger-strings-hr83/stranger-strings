let table = require('./index.js');


let retrieveContentByGenre = (genreType, callback) => {
	table.Genre
	  .forge()
	  .where('name', 'LIKE', '%' + genreType + '%')
	  .query()
	  .select()
	  .then((model) => {
	  	if (model.length > 0) {
		  	let genre_id = model[0].id;
		  	table.Content
		  	  .forge()
		  	  .where('genre_id', '=', genre_id)
		  	  .query()
		  	  .select()
		  	  .limit(40)
		  	  .then((model) => {
		  	  	callback(model);
		  	  })
	  	} else {
	  		callback([]);
	  	}
	  })
}

let getKeywordContent = (name, callback) => {
	table.Content
	  .forge()
	  .where('name', 'LIKE', '%' + name + '%')
	  .query()
	  .select()
	  .limit(20)
	  .then((model) => {
	  	callback(model);
	  });
}

	// Update total views of show based on content_id
let updateViews = (content_id, callback) => {
	incrementTotal(table.Movies, content_id, 'total_views', 1, callback);
	incrementTotal(table.Seasons, content_id, 'total_views', 1, callback);
} 

	// Update total bytes of show based on content_id
let updateBytes = (content_id, bytes, callback) => {
	incrementTotal(table.Movies, content_id, 'total_bytes', bytes, callback);
	incrementTotal(table.Seasons, content_id, 'total_bytes', bytes, callback);
}

let incrementTotal = (table, content_id, column, num, callback) => {
	table
	  .query()
	  .where('content_id', '=', content_id)
	  .increment(column, num)
	  .then(() => {
		  callback();
	  });
}


module.exports.retrieveContentByGenre = retrieveContentByGenre;
module.exports.getKeywordContent = getKeywordContent;
module.exports.updateViews = updateViews;
module.exports.updateBytes = updateBytes;
