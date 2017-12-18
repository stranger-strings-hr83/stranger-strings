const express = require('express');
const body = require('body-parser');
const app = express();

app.use(body.json());

let table = require('../database/index.js')
let elastic = require('./elasticSearch.js');
let helpers = require('../database/helpers.js');
let genre = require('../database/data/genre.js');


// Getting content by a specific genre
app.get('/genre', (req, res) => {
	let randomGenre = Math.floor(Math.random() * 25);
	helpers.retrieveContentByGenre(genre[randomGenre], function(response) {
		res.json(response);
	});
});


app.get('/keywordContent', (req, res) => {
	helpers.getSimilarContent('County', function(response) {
		res.json(response);
	});
});

app.patch('/updateViews', (req, res) => {
	helpers.updateTotalViews(2, function() {
		res.send();
	})
});

app.post('/updateTotalbytes', (req, res) => {

})


// app.post('/add', (req, res) => {
// 	elastic.addDocument({title: 'action'})
// 	res.send('hi')
// });

// app.post('/delete', (req, res) => {
// 	elastic.indexExists().then(function (exists) {  
// 	  if (exists) { 
// 	    return elastic.deleteIndex(); 
// 	  } 
// 	})
// 	res.send('done deleting')
// })

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});