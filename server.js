var express = require('express');
var search = require('bing.search');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:query', function(req, res) {
	var query = req.params.query;
	var size = req.query.offset || 10;
	var search = new Search(process.env.BING_API_KEY);
	search.images(query, {
		top: size
	}, function(err, results) {
		if (err) throw err;
		res.send(results.map(makeList));
	});
	
	function makeList(img) {
		return {
			"url": img.url,
			"snippet": img.title,
			"thumbnail": img.thumbnail.url,
			"context": img.sourceUrl
		};
	}
});

app.listen(port, function () {
	console.log('Example app listening on port ' + port);
});