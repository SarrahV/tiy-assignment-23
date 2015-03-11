var Router = Backbone.Router.extend({

  routes: {
    "tracks/:genre" : "loadGenre"
  },

  initialize: function() {
    this.tracks = new TrackCollection();
    this.tracksView = new TrackCollectionView({
      collection: this.tracks
    });

    $(".main").append(this.tracksView.el);
  },

  loadGenre: function(genre) {
    this.tracks.loadGenre(genre);
  }

});
