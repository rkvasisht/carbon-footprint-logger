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
      var totalDistanceArray = [];
      milage.forEach(function(distance){
        var dist = distance.distance
        totalDistanceArray.push(parseInt(dist));
      })
      var totalDistanceArrayReduce = totalDistanceArray.reduce((total, ammount) => total + ammount);
      var distanceTraveled = totalDistanceArrayReduce/0.621371;



      request.post('http://impact.brighterplanet.com/automobiles.json?daily_distance='+distanceTraveled+'&make='+make+'&model='+model+'&timeframe=2018-01-01%2F2019-01-01&year='+year+'',
            {
                  key:'207b6b0f-de5d-40ee-a4d9-4d0a9103c4fc'}, function(error, response, body){
                    var footprintData = JSON.parse(body);
                    var footprintAmount = footprintData.decisions.carbon.description
                    var footprintAmountDailyInTons = ((footprintAmount.match(/\d+/)[0])*2.20462/365).toFixed(2);
                    console.log(footprintAmountDailyInTons);
                    // console.log(footprintAmount);


                  })

    })
    });
  });




module.exports = router;
