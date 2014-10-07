/**
 * @jsx React.DOM
 */

var React = require('react');

var Form = require('../components/Form.react');
var Track = require('../components/Track.react');

var xhr = require('../utils/xhr');
var API = require('../utils/API');

// entry class for react
// makes the calls to spotify api
var Spotify = React.createClass({

  getInitialState: function() {
    return {
      isFetching: false,
      topTracks: []
    };
  },

  // json parse all the tracks
  _condense: function(trackArray) {
    var tracks = [];
    for (var i = 0; i < trackArray.length; i++) {
      var current = trackArray[i].tracks;
      for (var j = 0; j < current.length; j++) {
        tracks.push(current[j]);
      }
    };
    // single artist case
    if (!trackArray.length) {
      for (var j = 0; j < trackArray.tracks.length; j++) {
        tracks.push(trackArray.tracks[j]);
      }
    }
    return tracks;
  },

  _setState: function(trackArray) {
    var tracks = this._condense(trackArray);
    // get top 5 by popularity
    tracks.sort(function(a, b) {
      return b.popularity - a.popularity;
    });
    tracks = tracks.slice(0, 5);
    this.setState({
      // we are finally done calling spotify API
      isFetching: false,
      topTracks: tracks
    })
  },

  // search for related artists top tracks
  _otherArtists: function(otherArtists, index, together) {
    var artistId = otherArtists[index].id;
    var params = {
      'country' : 'US'
    };

    xhr('GET', API.getURL('/artists/'+artistId+'/top-tracks', params))
      .success(function(data) {
        together.tracks.push(data);
        together.remaining--;
        // if this is the last artist,
        // continue onto choosing top tracks
        if(!together.remaining) {
          this._setState(together.tracks);
        }
      }.bind(this));
  },

  // search for related artists
  _changeTracksWithRelated: function(artistId, origArtistTopTracks) {
    var params = {
    };

    xhr('GET', API.getURL('/artists/'+artistId+'/related-artists', params))
      .success(function(data) {
        var numberOfArtists = data.artists.length;
        var self = this;
        (function(numberOfArtists) {
          // remaining calls to make,
          // array of top tracks we have seen
          var together = {
            remaining: numberOfArtists,
            tracks: [origArtistTopTracks]
          };
          // handle case where there are no other artists
          if (numberOfArtists === 0) {
            self._setState(origArtistTopTracks);
          }
          for (var i = 0; i < numberOfArtists; i++) {
            (function(j) {
              self._otherArtists(data.artists, i, together);
            })(i);
          };
        })(numberOfArtists);
      }.bind(this));
  },

  // search for top tracks from artistId
  _changeTracks: function(artistId) {
    var params = {
      // assume songs are in US
      'country' : 'US'
    };

    xhr('GET', API.getURL('/artists/'+artistId+'/top-tracks', params))
      .success(function(data) {
        this._changeTracksWithRelated(artistId, data)
      }.bind(this));
  },

  // search for artist
  _handleFormSubmit: function(artist) {
    var params = {
      'q': artist,
      'type': 'artist'
    };

    this.setState({isFetching: true});
    xhr('GET', API.getURL('/search', params))
      .success(function(data) {
        // json parsing
        var searchId;
        try {
          searchId = data.artists.items[0].id;
        } catch (error) {
          // if no items are present becuase of bad input,
          // set search id to match id of empty search
          searchId = '6YMSq0CWN7f7PeJ96Zfz2S';
        }
        this._changeTracks(searchId);
      }.bind(this));
  },

  render: function() {
    return (
      <div>
        <h1>Artist Song Search</h1>
        <Form
          isDisabled={this.state.isFetching}
          artists={this.state.artists}
          onSubmit={this._handleFormSubmit}
        />
        <h3>Top Tracks From related Artists</h3>
          <Track tracks={this.state.topTracks} />
      </div>
    );
  }

});

module.exports = Spotify;
