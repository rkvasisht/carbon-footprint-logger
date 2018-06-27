var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  console.log('profile was hit')
  res.render('/profile/index');
});


module.exports = router;
