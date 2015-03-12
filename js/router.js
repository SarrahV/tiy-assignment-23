var Router = Backbone.Router.extend({

  routes: {
    "tracks/:genre" : "loadGenre"
  },

  initialize: function() {
    this.genreView = new GenreSelectionView();
    this.tracks = new TrackCollection();
    this.tracksView = new TrackCollectionView({
      collection: this.tracks
    });

    // initial structure

    $(".main").append(this.tracksView.el);
    $("aside").append(this.genreView.el);
    

    this.listenTo(this.genreView, "link:click", function(genre){
      this.loadGenre(genre);
      this.navigate("tracks/" + genre);
    });
  },

  loadGenre: function(genre) {
    this.tracks.loadGenre(genre);
  }

});
