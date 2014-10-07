## Artist Radio (100 points)

Due Date: Sunday, October 5, 2014

For this assignment, you'll create a small web application that allows the user to enter a music artist's name and receive a list of related tracks.

You'll use the [Spotify Web API](https://developer.spotify.com/web-api/endpoint-reference/) to find this list of related songs.

- Use the [/search](https://developer.spotify.com/web-api/search-item/) endpoint to find the first matched artist (say artist `X`) for the user's input
- Use the [/artists/{id}/top-tracks](https://developer.spotify.com/web-api/get-artists-top-tracks/) endpoint to find top tracks for artist `X` (say tracks `X_1, ... , X_n`)
- Use the [/artists/{id}/related-artists](https://developer.spotify.com/web-api/get-related-artists/) endpoint to find all related artists for artist `X` (say artists `Y_1, ... , Y_n`)
- For each artist `Y_i` from `Y_1, ... , Y_n`, use the [/artists/{id}/top-tracks](https://developer.spotify.com/web-api/get-artists-top-tracks/) endpoint to find top tracks for `Y_i` (say tracks `Y_i_1, ... , Y_i_m`)
- From all the tracks (`X_1, ... , X_n, Y_1_1, ... Y_1_m, ... , Y_n_1, ... , Y_n_m`), pick the top 5 tracks with the highest `popularity` (you may use arbritrary tie breakers)

You have complete freedom over designing the User Interface for the assignment. Just an inputbox for the artist name, a button to search and a list of tracks is sufficient. You may use any open source libraries ([bootstrap](http://getbootstrap.com/), [foundation](http://foundation.zurb.com/), [jquery](http://jquery.com/) (although I'd very much prefer if you didn't), [underscorejs](http://underscorejs.org/), etc.) as long as you cite them in this document. You may also use any code that we've used in class for examples.

### Scoring
- Functionality: 100 points
- Meaningfully written code and/or high level comments in code: 10 extra credit points
- Flagrant violation of style guide: upto -20 points


> Add list of third-party resources used here
> bootstrap, react.js, in class examples

and

> https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
