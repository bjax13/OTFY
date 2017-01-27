const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const cors = require('cors');
const massive = require('massive');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const config = require('./config.json');

const app = module.exports = express();
const port = config.port;

app.use(bodyParser.json());
app.use(cors());

// app.use(cookieParser(config.secret));
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/dist"));

//setup database connection
const massiveInstance = massive.connectSync({connectionString: 'postgres://localhost/Optify'});

app.set('db', massiveInstance);
const db = app.get('db');
// end setup of database

const oAuthCtrl = require('./serverCtrls/oAuthCtrl.js');


// FacebookStrategy
passport.use('facebook', new FacebookStrategy ({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL:'http://localhost:3000/auth/facebook/callback',
  profileFields:['id', 'displayName','email']
},oAuthCtrl.facebookAuth));

// GoogleStrategy
passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: "http://localhost:3000/auth/google/callback",
  profileFields: ['id', 'displayName','email']
},oAuthCtrl.googleAuth));


passport.serializeUser(oAuthCtrl.serializeUser);
passport.deserializeUser(oAuthCtrl.deserializeUser);

// LocalStrategy

// FacebookStrategy endpoints
app.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login' }), oAuthCtrl.facebookCallback);

// GoogleStrategy endpoints

app.get('/auth/google', passport.authenticate('google', {scope:['https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read']}, (req, res) => {
    const token = jwt.sign();
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {successRedirect: '/' , failureRedirect: '/login'}), function(req, res) {
    res.status(200).send(req.user);
});

// LocalStrategy endpoints

// app.get('/',
//   function(req, res) {
//     res.render('main', { user: req.user });
//   });
//
// app.get('/login',
//   function(req, res){
//     res.render('login');
//   });

app.post('/login', function(req, res, done){
      db.getUserByUsername([req.body.username], function(err, user) {
        if(!user.length){
          res.json(false);
          return;
        }
        if (err) { console.log(err); return;}
        if (user[0].password != req.body.password) {
        res.json(false);
        }
        else {
          res.json(true);
          req.session.passport.user = user[0];
        }
      });
    });



app.post('/api/user', function (req, res) {
  console.log(req.body);

  db.createUserLocal([req.body.username,req.body.password,req.body.email], function (err, user) {
    res.status(200).json('success');
  });
});

// app.get('/login', function(req, res) {
//   res.render('login');
// });

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.listen(config.port, function () {
  console.log("it is ALIVE!!  @"+ port);
});
