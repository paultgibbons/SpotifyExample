var BASE = 'https://api.spotify.com/v1';

function getURL(method, parameters) {
  var url = BASE + method + '?';

  for (var parameter in parameters) {
    if (parameters.hasOwnProperty(parameter)) {
      url += parameter + '=' + parameters[parameter] + '&';
    }
  }

  url = url.slice(0, -1);

  return url;
}

module.exports = {getURL: getURL};