var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('bonus.handlebars',{title:'бонусная система Green House', layout:'bon'});
});

module.exports = router;
