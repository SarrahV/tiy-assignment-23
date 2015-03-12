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

    // initial structure

    $(".main").append(this.tracksView.el);
    $("aside").append(this.listView.el);
  },

  // listeners

  /*this.listenTo(this.listView, "link:click", function(name){
    this.listView.loadGenre(name);
  });*/

  loadGenre: function(genre) {
    this.tracks.loadGenre(genre);
  }

});
