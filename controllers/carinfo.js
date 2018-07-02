var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var request = require('request');


//Route to get vehicle information
router.get('/', isLoggedIn, function(req, res) {
//Get vehicle information for a specific userId
  db.vehicle.findAll({where:{userId: req.user.id}}).then(function(vehicles){
    res.render('carinfo/show', {vehicles: vehicles})
  })
});

router.get('/new', isLoggedIn, function(req, res){
  res.render('carinfo/new')
})

//Route to enter a new vehicle data.
router.post('/new', isLoggedIn, function(req, res) {
//Add vehicle information to database
  db.vehicle.create({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    userId: req.user.id
  }).then(function(vehicle){
    res.redirect('../profile');
  })

});



//Route to get data from api
router.get('/:id', isLoggedIn, function(req, res){
//Get data for the vehicle that was used and the distance it traveled
  db.vehicle.findById(req.params.id).then(function(vehicle){
    vehicle.getMileages().then(function(mileage){
//Vehicle information from vehicle model.
      var make = vehicle.make;
      var model = vehicle.model;
      var year = vehicle.year;
//The last distance that was entered in the mileage array. This corresponds to user input of distance traveled on a trip.
      var lastMileage = mileage[mileage.length-1]
      var distance = lastMileage.distance;
//Query the api for carbon footprint based on the year variable, model variable, year variable and distance that was traveled in that car during the trip that was entered.
      request.post('http://impact.brighterplanet.com/automobiles.json?daily_distance='+distance+'&make='+make+'&model='+model+'&timeframe=2018-01-01%2F2019-01-01&year='+year+'',
          {key:'207b6b0f-de5d-40ee-a4d9-4d0a9103c4fc'}, function(error, response, body){

      var footprintData = JSON.parse(body);
      //data that comes back from the api
      var footprintAmount = footprintData.decisions.carbon.description;
      //the carbon footprint amount that is listed in the data from the api.
      var footprintAmountDailyInPounds = ((footprintAmount.match(/\d+/)[0])*2.20462/365).toFixed(2);
      //convert from metric to english
        db.mileage.update({carbon:footprintAmountDailyInPounds},
          {where:{
            vehicleId: req.params.id,
            distance: mileage[mileage.length-1].distance
              }
        });
                //update the mileage model with the carbon amount for the car and distance that was driven.
      res.redirect('../profile')

    });
  });
});
});

router.delete('/:id', function(req, res){
  db.vehicles.destroy({
    where: {id: req.params.id}

  }).then(function(data){
    console.log(data)
    res.redirect('/');
  })
});





module.exports = router;
