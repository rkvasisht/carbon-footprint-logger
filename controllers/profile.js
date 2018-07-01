var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res){
  db.mileage.findAll(
   req.body.carbon).then(function(carbon){
      var carbonFootprintForDistanceTraveled = carbon[carbon.length-1].carbon;
      res.render('profile/index', {carbonFootprintForDistanceTraveled: carbonFootprintForDistanceTraveled});
    })
})




module.exports = router;
