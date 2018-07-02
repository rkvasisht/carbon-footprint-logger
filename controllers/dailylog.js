var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var bodyParser = require('body-parser');
var router = express.Router();


router.get('/', isLoggedIn, function(req, res){
  db.vehicle.findAll({where:{userId: req.user.id}}).then(function(vehicles){
    res.render('dailylog/show', {vehicles: vehicles})
  })
})

router.post('/', isLoggedIn, function(req, res) {
  var vehicleUsed = req.body.vehicles
  db.mileage.create({
    distance: req.body.distance,
    vehicleId: vehicleUsed
  }).then(function(mileage){
    res.redirect('/carinfo/'+vehicleUsed);
  })

});





module.exports = router;
