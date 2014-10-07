/**
 * @jsx React.DOM
 */

var React = require('react');

// lists top tracks
var Track = React.createClass({

  _renderTrack: function(track) {
    return (
      <li key={track.name}>
        {track.name} (
        <a href={track.preview_url}>
          Preview
        </a>)
      </li>
    );
  },

  render: function() {
    var tracks = this.props.tracks
    return (
      <ol>
        {tracks.map(this._renderTrack)}
      </ol>
    );
  }

});

module.exports = Track;
