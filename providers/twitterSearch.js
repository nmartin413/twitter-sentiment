

var Twit = require('twit');
var Q = require('q');
var _ = require('underscore');


var Twitter = new Twit({
	consumer_key: 'O3KGO9D3LM4mLUt7tHwvqKd50',
	consumer_secret: '4QkH9yYlf8qzxmd4w8uayM63aUjrp1IexNQbwWeNsVgduCk1Iw',
	access_token: '18183001-X6niUPvqd8fHladFqyYM4eige8zko3Aj7qV1ih4J8',
	access_token_secret: 'dHTs9e7jDhTYH1bRgSNxCD7J07mZdV2mBwWCQ32QP1V7S'
});


module.exports = function (searchText) {
	return function () {
		var opts = {
			q: searchText,
			count: 100
		};

		return Q.promise(function (resolve, reject) {
			Twitter.get('search/tweets', opts, function(err, reply) {
				if (err) {
					return reject(err);
				}
		  		
		  		var data = _.map(reply.statuses, function (status) {
		  			return {
		  				text: status.text,
		  				date: status['created_at']
		  			};
		  		});

		  		resolve(data);

			});
		});
	}
};
