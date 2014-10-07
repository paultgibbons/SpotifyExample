/**
 * @jsx React.DOM
 */

var React = require('react');

// renders form to submit artist name
var Form = React.createClass({

  _getClassName: function(className) {
    return this.props.isDisabled ? 'disabled ' + className : className;
  },

  _handleSubmit: function(event) {
    event.preventDefault();
    var artist = this.refs.artist.state.value;
    this.props.onSubmit(artist);
  },

  render: function() {
    var isDisabled = this.props.isDisabled;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="artist">Artist</label>
          <input
            ref="artist"
            type="text"
            className={this._getClassName("form-control")}
            disabled = {isDisabled}
            id="artist">
          </input>
        </div>
        <button
          type="submit"
          className={this._getClassName("btn btn-default")}
          disabled={isDisabled}
          onClick={this._handleSubmit}>
          Find Tracks
        </button>
      </form>
    );
  }

});

module.exports = Form;