var Router = Backbone.Router.extend({

  routes: {
    "tracks/:genre" : "loadGenre"
  },

  initialize: function() {
    this.listView = new GenreSelectionView();
    this.tracks = new TrackCollection();
    this.tracksView = new TrackCollectionView({
      collection: this.tracks
    });

    $(".main").append(this.tracksView.el);
    $("aside").append(this.listView.el);
  },

  loadGenre: function(genre) {
    this.tracks.loadGenre(genre);
  }

});
