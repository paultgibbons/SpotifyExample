/** @jsx React.DOM */

var React = require('react');
var Spotify = require('./components/Spotify.react');

React.renderComponent(
  <Spotify />,
  document.getElementById('spotify')
);
