
var Backbone = require('backbone');
var _ = require('underscore');
var Post = require('./post');
var Q = require('q');

var PostCollection = Backbone.Collection.extend({

	model: Post,

	getAverage: function () {
		var scores = this.pluck('sentiment');
		return (_.reduce(scores, function (m, v) { return m + v; }, 0) / scores.length);
	},

	getNonZeroAverage: function () {
		var scores = _.without(this.pluck('sentiment'), 0);
		return (_.reduce(scores, function (m, v) { return m + v; }, 0) / scores.length);
	},

	calculateSentiment: function () {
		return Q.all(this.invoke('calculateSentiment'));
	}

}, {

	fromProvider: function (provider) {
		var posts = new this;
		return provider()
			.then(function (data) {
				posts.add(data);
				return posts;
			});
	}


});

module.exports = PostCollection;


