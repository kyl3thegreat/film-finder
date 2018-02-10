// Require the express module
const express = require('express');
// Call expresses Router method
const router = express.Router();

// Define Get request for the about route
router.get('/', (req, res) => {
  res.render('about');
});

// Export the about route
module.exports = router;
