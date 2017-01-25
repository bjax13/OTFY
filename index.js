const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors');
const massive = require('massive');
// const cookieParser = require('cookie-parser');

const config = require('./config.json');

const app = express();
const port = config.port;

app.use(bodyParser.json());
app.use(cors());

// app.use(cookieParser(config.secret));
app.use(session({
  // secret: config.secret,
  secret: 'bacon',
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
  profileFields:['id', 'displayName']
},(accessToken,refreashToken, profile, done) =>{
  // Access the database
  db.getUserByFacebook([profile.id], function(err, user) {
    if (!user.length) {
      db.createUserFacebook([profile.displayName, profile.id], function(err, user) {
        return done(err, user[0], {scope: 'all'});
      });
    } else {
      return done(err, user[0]);
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

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login' }), function(req, res) {
    res.redirect('/#/');
    console.log(req.session);
});

// app.get('/auth/me', function(req, res) {
//   if (!req.user) return res.sendStatus(404);
//   res.status(200).send(req.user);
// });

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.listen(config.port, function () {
  console.log("it is ALIVE!!  @"+ port);
});
