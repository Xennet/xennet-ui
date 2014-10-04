App = Ember.Application.create({});

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
  	// child (nested) route
  	this.resource('post', { path: ':post_id' });
  });
});


//route to connect between the template and the model
App.PostsRoute = Ember.Route.extend({
	model: function() {
		//return posts;

		return $.getJSON('http://tomdale.net/api/get_recent_posts/?callback=?').then(function(data) {
			return data.posts.map(function(post) {
				post.body = post.content;
				return post;
			});
		});
	}
});

// allow direct access to a specific post via the URL
App.PostRoute = Ember.Route.extend({
    model: function(params) {
    	return $.getJSON('http://tomdale.net/api/get_post/?id=' + params.post_id + '&callback=?').then(function(data) {
    		data.post.body = data.post.content;
    		return data.post;
    	})
    }
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});

// fake data
var posts = [{
	id: '1',
	title: "Belles Belles Belles",
	author: {name: "Claude François"},
	date: new Date('1-7-1962'),
	excerpt: "Belles belles belles comme le jour",
	body: "Elles sont toutes \nBelles belles belles comme le jour \nBelles belles belles comme l'amour"
}, {
	id: '2',
	title: "Le Téléphone Pleure",
	author: {name: "Claude François"},
	date: new Date('1-10-1974'),
	excerpt: "Le téléphone pleure quand elle ne vient pas",
	body: "Le téléphone pleure quand elle ne vient pas \
		\nQuand je lui crie : \"Je t'aime\" \
		\nLes mots se meurent dans l'écouteur \
		\nLe téléphone pleure, ne raccroche pas \
		\nJe suis si près de toi avec la voix"
}];



