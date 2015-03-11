var Track = Backbone.Model.extend({

  play: function() {
    if(!this.stream) {
      this._loadStream();
      return;
    }
    this.stream.play();
    this.trigger("stream:play");
  },

  pause: function() {
    this.stream.pause();
    this.trigger("stream:pause");
  },

  _loadStream: function(autoPlay) {
    this.trigger("stream:loading");
    SC.stream("/tracks/" + this.id, function(sound){
      this.stream = sound;
      this.trigger("stream:loaded");
      this.play();
    }.bind(this));
  }

});

var TrackCollection = Backbone.Collection.extend({

  model: Track,

  loadGenre: function(genre) {
    SC.get('/tracks', { genres: genre }, function(tracks) {
      this.reset(tracks);
    }.bind(this));
  },

  search: function(query) {
    SC.get('/tracks', { q: query }, function(tracks) {
      this.reset(tracks);
    }.bind(this));
  }

});
