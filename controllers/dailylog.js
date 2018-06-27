var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var bodyParser = require('body-parser');
var router = express.Router();


router.get('/', isLoggedIn, function(req, res) {

  db.vehicle.findAll().then(function(vehicles){
    res.render('dailylog/show', {vehicles: vehicles})
  })
});

router.get('/new', isLoggedIn, function(req, res){
  db.vehicle.findAll().then(function(vehicles){
    res.render('dailylog/new', {vehicles: vehicles})
  })
})

router.post('/new', isLoggedIn, function(req, res) {

  db.milage.create({
    distance: req.body.distance,
    vehicleId: req.body.vehicles
  }).then(function(milage){
    res.redirect('./');
  })

});



module.exports = router;
