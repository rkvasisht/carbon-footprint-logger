var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var bodyParser = require('body-parser');
var router = express.Router();



router.delete('/:index', function(req, res){
  db.vehicle.destroy({
    where: {id: req.params.index}

  }).then(function(data){
    console.log(data)
    res.sendStatus(200);
  })
})



module.exports = router;
