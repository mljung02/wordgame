var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/start', function(req, res, next){
  res.render('start');
})

router.get('/level2', function (req, res, next) {
  res.render('level2');
})

module.exports = router;
