const express = require('express');
const body = require('body-parser');
const app = express();
app.use(body.json());

let table = require('../database/index.js')
let elastic = require('./elasticSearch.js');
let helpers = require('../database/helpers.js');

// Getting content by a specific genre
app.get('/genre', (req, res) => {
	let {genre} = req.body;
	helpers.retrieveContentByGenre(genre, function(response) {
		console.log(response)
		res.json(response);
	});
});

// Get content by keyword
app.get('/keywordContent', (req, res) => {
	let {content} = req.body;
	helpers.getKeywordContent(content.toLowerCase(), function(response) {
		console.log(response)
		res.json(response);
	});
});

// Update total views of 1 show => Set up q later to update multiple at time
app.patch('/updateViews', (req, res) => {
	let {content_id} = req.body;
	helpers.updateViews(content_id, function() {
		res.send();
	})
});


// Update total bytes of 1 show
app.patch('/updateBytes', (req, res) => {
	let {content_id, bytes} = req.body;
	helpers.updateBytes(content_id, bytes, function() {
		res.send();
	});
})

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});