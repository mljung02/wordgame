var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLABS_URI);
var alphabotsUsers = db.get('alphabotsUsers');
var bcrypt = require('bcryptjs');
var session = require('cookie-session');
var validate = require('../logic.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', req.session);
});

router.get('/start', function(req, res, next){
  console.log(req.session)
  res.render('start', req.session);
})

router.get('/level2', function (req, res, next) {
  res.render('level2', req.session);
})

router.get('/buy', function (req, res, next) {
  res.render('buy', req.session);
})

router.post('/login', function (req, res, next) {
  console.log(req.body.email)
  alphabotsUsers.findOne({email: req.body.email}, function (err, record) {
    console.log(record)
    if (record != null) {
      if(bcrypt.compareSync(req.body.pw, record.pw)){
        req.session.email = req.body.email;
        req,session.errors = []
        res.redirect('/start');
      } else {
        req.session.errors = ['Invalid username and/or password']
        res.redirect('/errors')
      }
    }
  })
})

router.get('/signup', function (req, res, next) {
  res.render('signup');
})

router.post('/signup', function (req, res, next) {
  if (req.body.pw === req.body.pwconfirmation) {
    var hash = bcrypt.hashSync(req.body.pw, 8);
    alphabotsUsers.find({}, function (err, records) {
      var master = validate(req.body, records);
      if (master.errors.length) {
        req.session.errors = master.errors;
        res.redirect('/errors');
      }
      else{
        alphabotsUsers.insert({email: req.body.email, pw: hash});
        res.redirect('/');
      } 
    })
  }
  else{
    console.log('this one')
    req.session.errors = ['Passwords do not match']
    res.redirect('/errors')
  }
})

router.get('/errors', function (req, res, next) {
  res.render('erroralpha', req.session)
})

router.get('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
})

router.post('/update', function (req, res, next) {
  console.log(req.session.email, req.body.scrap)
  alphabotsUsers.update({email: req.session.email}, {$set: {scrap: req.body.scrap}}, function (err,record) {
    res.send(req.body.scrap + " scrap recorded.")
  })
})

module.exports = router;
