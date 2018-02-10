// Require the express module
const express = require('express');
// Call expresses Router method
const router = express.Router();
// Require request module
const request = require('request');
// Require apiKey file
const apiKey = require('../apiKey.json');

//  Define GET request for home route
router.get('/', (req, res) => {
  res.render('index');
});
// Define POST request for the home route GetMovie form
router.post('/search', (req, res) => {
  if(req.body.searchQuery === ''){
    res.render('error', {error});
  }
  else {
    // Api Request to get movie data
    request('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey.apiKey + '&query=' + req.body.searchQuery, (error, response, body) => {
      if(error){
        res.render('error', {error});
      }
      else {
        if(response.statusCode === 200){
          let movieData = JSON.parse(body);

          // API call to get genre list
          request('https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey.apiKey +'&language=en-US', (error, response, body) => {
            if(error){console.log(error);}
            console.log(response.statusCode);
            const genres = JSON.parse(body);
            const genreList = [ ];
            // Nested loops in order to switch out the genre_ids for their names
            for(var prop in genres){
              for(i = 0; i < movieData.results[0].genre_ids.length; i++){
                for(j=0; j < genres[prop].length; j ++){
                  if(movieData.results[0].genre_ids[i] === genres[prop][j].id){
                    genreList.push(' ' + genres[prop][j].name);
                  }
                }
              }
            }
            values = {
              posterPath: movieData.results[0].poster_path,
              title: movieData.results[0].title,
              releaseDate: movieData.results[0].release_date,
              genreIds: genreList,
              description: movieData.results[0].overview,
            }
            res.render('movie-view', values);
          });
        }
        else{
          res.render('error', {error});
        }
      }
    });
  }

});



// Export the index routes
module.exports = router;
