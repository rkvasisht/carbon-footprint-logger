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
    res.redirect('carinfo/show');
  })

});



router.get('/:id', isLoggedIn, function(req, res){
  db.vehicle.findById(req.params.id).then(function(vehicle){
    vehicle.getMileages().then(function(mileage){
      var make = vehicle.make;
      var model = vehicle.model;
      var year = vehicle.year;
      var lastMileage = mileage[mileage.length-1]
      var distance = lastMileage.distance;

      request.post('http://impact.brighterplanet.com/automobiles.json?daily_distance='+distance+'&make='+make+'&model='+model+'&timeframe=2018-01-01%2F2019-01-01&year='+year+'',
            {key:'207b6b0f-de5d-40ee-a4d9-4d0a9103c4fc'}, function(error, response, body){

                var footprintData = JSON.parse(body);
                var footprintAmount = footprintData.decisions.carbon.description;
                var footprintAmountDailyInPounds = ((footprintAmount.match(/\d+/)[0])*2.20462/365).toFixed(2);
                db.mileage.update({carbon:footprintAmountDailyInPounds},
                  {where:{
                    vehicleId: req.params.id,
                    distance: mileage[mileage.length-1].distance
                  }
                });
      res.redirect('../profile', {footprintAmountDailyInPounds:footprintAmountDailyInPounds})

    });
  });
});
});





module.exports = router;
