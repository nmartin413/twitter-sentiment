var Backbone = require('backbone');
var _ = require('underscore');
var sentiment = require('sentiment');
var Q = require('q');

var extra = {
	prices: -3
};

var Post = Backbone.Model.extend({

	defaults: {
		text: '',
		time: null
	},


	calculateSentiment: function () {
		return Q.promise(_.bind(function (resolve, reject) {
			sentiment(this.get('text'), extra, _.bind(function (err, result) {
				if (err) return reject(err);

				this.set('sentiment', result.score);
				resolve();
			}, this));
		}, this));
	}

});

module.exports = Post;