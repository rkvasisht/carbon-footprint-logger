var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var request = require('request');



router.get('/', isLoggedIn, function(req, res) {

  db.vehicle.findAll().then(function(vehicles){
    res.render('carinfo/show', {vehicles: vehicles})
  })
});

router.get('/new', isLoggedIn, function(req, res){
  res.render('carinfo/new')
})


router.post('/new', isLoggedIn, function(req, res) {

  db.vehicle.create({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    userId: req.user.id
  }).then(function(vehicle){
    res.redirect('./');
  })

});

router.get('/:id', isLoggedIn, function(req, res){
  db.vehicle.findById(req.params.id).then(function(vehicle){
    vehicle.getMilages().then(function(milage){
      var make = vehicle.make;
      var model = vehicle.model;
      var year = vehicle.year;
      var distance = milage[0].distance;
      console.log(make);
      console.log(model);
      console.log(year);
      console.log(distance);


      request.post('http://impact.brighterplanet.com/automobiles?daily_distance='+distance+'&make='+make+'&model='+model+'&timeframe=2018-01-01%2F2019-01-01&year='+year+'',
                  {
                  key:'207b6b0f-de5d-40ee-a4d9-4d0a9103c4fc'}, function(error, response, body){
                    console.log(body);
                  })

    })


    });
  });




module.exports = router;
