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

const app = express();
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


// FacebookStrategy

passport.use('facebook', new FacebookStrategy ({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL:'http://localhost:3000/auth/facebook/callback',
  profileFields:['id', 'displayName','email']
},(accessToken,refreashToken, profile, done) =>{
  // Access the database
  db.getUserByFacebook([profile.id], function(err, user) {
    if (!user.length) {

      db.createUserFacebook([profile.displayName, profile.id , profile.emails[0].value], function(err, user) {
        console.log('**********');
        console.log(user);
        return done(err, user[0], {scope: 'all'});
      });
    } else {
      return done(err, user[0]);
    }
  });
}));

// GoogleStrategy

passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: "http://localhost:3000/auth/google/callback",
  profileFields: ['id', 'displayName','email']
},
function(accessToken, refreshToken, profile, cb) {
  console.log("Profile :" + profile);
  console.log(profile);

  db.getUserByGoogleId([profile.id], function(err, user) {
    console.log('******');
    console.log(user);
    console.log(err);
    if (!user) {
      console.log('CREATING USER');
      db.createUserGoogle([profile.displayName, profile.id , profile.email], function(err, user) {
        console.log('USER CREATED', user[0]);
        return cb(err, user[0], {scope: 'all'});
      });
    } else {
      return cb(err, user[0]);
    }
  });
}));


passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  db.getUserByFacebook([user.facebookid], function(err, user) {
    done(null, user);
  });
});


// FacebookStrategy endpoints
app.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login' }), function(req, res) {
    res.redirect('/#/');
    console.log(req.session);
});

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

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
});

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.listen(config.port, function () {
  console.log("it is ALIVE!!  @"+ port);
});
