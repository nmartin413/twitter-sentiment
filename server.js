

var express = require('express');
var exphbs = require('express3-handlebars');
var app = express();
var _ = require('underscore');

var PostCollection = require('./model/postCollection');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var queryDefaults = {
	search: '@nmartin413'
};

app.get('/', function(req, res) {
	var query = _.defaults((req.query || {}), queryDefaults);

	var searchString = [query.search].join(' ');

	var provider = require('./providers/twitterSearch')(searchString);

	var contentType = req.contentType;



	PostCollection.fromProvider(provider)
		.then(function (posts) {
			posts.calculateSentiment().then(function () {
				var data = {
					posts: posts.toJSON(),
					query: query,
					searchString: searchString,
					average: posts.getAverage(),
					nonZeroAverage: posts.getNonZeroAverage()
				};

				if (contentType)
					res.json(data);
				else
					res.render('home', data);

			});
		})
		.fail(function (err) {
			res.send(500, err);

		});

});

app.listen(3000);


