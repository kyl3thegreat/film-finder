// Require the express module
const express = require('express');
// Require the body-parser module
const bodyParser = require('body-parser');
// Require the routes folder
const mainRoutes = require('./routes');
const aboutRoute = require('./routes/about');
// Require request module
const request = require('request');

// Create the express server
const app = express();
// Set express view engine settings the pug
app.set('view engine', 'pug');
// Use the urlencode parser on bodyParser
app.use(bodyParser.urlencoded({extended: false}));
// Use the main routes
app.use(mainRoutes);
// Use the about route
app.use('/about', aboutRoute);
// Link the public folder to use static assets
app.use(express.static('public'));


// // Handler used to create error object to be handed off to the error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found!');
//   err.status = 404;
//   next(err);
// });
//
// // Create error middleware handler
// app.use((err, req, res, next) => {
//   res.locals.error = err;
//   res.status(err.status);
//   res.render('error');
// });

// Define which port you want the server to run on
app.listen(3000, () =>{
  console.log('The application is running on localhost:3000');
});
