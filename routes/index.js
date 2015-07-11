var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/alphabots');
var alphabotsUsers = db.get('alphabotsUsers');
var bcrypt = require('bcryptjs');
var session = require('cookie-session');
var localFunctions = require('../logic.js')

router.post('/delete', function (req, res, next) {
  alphabotsUsers.remove({email: req.session.email}, function () {
    res.redirect('/');
  })
})

router.get('/instructions', function (req, res, next) {
  res.render('instructions', req.session)
})

router.get('/signup', function (req, res, next) {
  res.render('signup');
})

router.get('/errors', function (req, res, next) {
  res.render('erroralpha', req.session);
})

router.get('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
})

router.post('/update', function (req, res, next) {
  alphabotsUsers.update({email: req.session.email}, {$set: {gameState: req.body}}, function (err,record) {
    req.session.scrap = req.body.scrap;
    res.send(req.body.scrap + " scrap recorded.");
  })
})

router.get('/update', function (req, res, next) {
  alphabotsUsers.findOne({email: req.session.email}, function (err, record) {
    res.send(record);
  })
})

router.get('/new', function (req, res, next) {
  alphabotsUsers.update({email: req.session.email}, {$set: {gameState: localFunctions.emptyGame()}}, function(err,record){
    console.log(record);
    res.redirect('/start');
  })
})

router.get('/gameover', function (req, res, next) {
  alphabotsUsers.update({email: req.session.email}, {$set: {gameState: localFunctions.emptyGame()}}, function(err,record){
    console.log(record);
    res.redirect('/');
  })
});

router.post('/login', function (req, res, next) {
  alphabotsUsers.findOne({email: req.body.email}, function (err, record) {
    if (record != null) {
      if(bcrypt.compareSync(req.body.pw, record.pw)){
        req.session.email = req.body.email;
        req.session.errors = [];
        res.redirect('/');
      } else {
        req.session.errors = ['Invalid username and/or password'];
        res.redirect('/errors');
      }
    } else {
      req.session.errors = ['Invalid username and/or password'];
      res.redirect('/errors');
    }
  })
})

router.post('/signup', function (req, res, next) {
  if (req.body.pw === req.body.pwconfirmation) {
    var hash = bcrypt.hashSync(req.body.pw, 8);
    alphabotsUsers.find({}, function (err, records) {
      var master = localFunctions.validate(req.body, records);
      if (master.errors.length) {
        req.session.errors = master.errors;
        res.redirect('/errors');
      }
      else{
        var master = {email: req.body.email, pw: hash};
        master.gameState = localFunctions.emptyGame();
        alphabotsUsers.insert(master);
        req.session.email = req.body.email;
        res.redirect('/');
      } 
    })
  }
  else{
    req.session.errors = ['Passwords do not match'];
    res.redirect('/errors');
  }
})

router.use(function (req, res, next) {
  if (req.session.email) {
    next();
  }
  else {
    res.render('index')
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.email){
    alphabotsUsers.findOne({email: req.session.email}, function (err, record) {
      res.render('index', record);
    })
  }
});

router.get('/start', function(req, res, next){
  alphabotsUsers.findOne({email: req.session.email}, function (err, record) {
    if (localFunctions.highScoreCheck(record)) {
      alphabotsUsers.update({email: req.session.email}, localFunctions.highScoreCalc(record));
    }
    if (record.gameState.phase === 1) {
      res.render('start', record);
    }
    else if (record.gameState.phase === 2){
      res.render('buy', record);
    }
    else {
      res.render('level2', record)
    }
  })
})

module.exports = router;
