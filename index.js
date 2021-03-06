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

// local required files





const app = module.exports = express();
const port = process.env.port;

app.use(bodyParser.json());
// app.use(cors());

app.use(session({
  secret: process.env.secret,
  saveUninitialized: true,
  resave: true,
  cookie:{
    maxAge:1000*60*60*24*7
  },
  secure:false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/dist"));

//setup database connection
const massiveInstance = massive.connectSync({connectionString: process.env.connectionString});

app.set('db', massiveInstance);
const db = app.get('db');
// end setup of database

// required server Ctrl files
const oAuthCtrl = require('./serverCtrls/oAuthCtrl.js');


// *** start oAuth  ****
// FacebookStrategy
passport.use('facebook', new FacebookStrategy ({
  clientID: process.env.facebookClientId,
  clientSecret: process.env.facebookClientSecret,
  callbackURL:'http://localhost:3000/auth/facebook/callback',
  profileFields:['id', 'displayName','email']
},oAuthCtrl.facebookAuth));

// GoogleStrategy
passport.use(new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
  callbackURL: "http://localhost:3000/auth/google/callback",
  profileFields: ['id', 'displayName','email']
},oAuthCtrl.googleAuth));

//serialize for oAuth
passport.serializeUser(oAuthCtrl.serializeUser);
passport.deserializeUser(oAuthCtrl.deserializeUser);

// LocalStrategy

// FacebookStrategy endpoints
app.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login' }), oAuthCtrl.facebookCallback);

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
app.post('/login', oAuthCtrl.localLogin);
app.post('/api/user', oAuthCtrl.createUserLocal);

// Logout
app.get('/auth/logout', oAuthCtrl.logout);

// *** end oAuth ****

app.get('/api/products', function (req, res, done) {
  db.getAllProducts (function (err, products) {
    res.status(200).json(products);
  });
});

app.post('/api/session', (req, res)=>{
  console.log(req.body);
  Object.keys(req.body).map(prop => {
    console.log(prop);
    req.session[prop]=req.body[prop];
  });
  res.status(200).send(req.session);
});

app.get('/api/session', (req,res)=>{
  res.status(200).send(req.session);
});

// useful for react
// app.get('*', (req,res)=>{
//   res.sendFile(`${__dirname}/dist/index.html`);
// });
//


app.listen((process.env.PORT || 3000), function () {
  console.log("it is ALIVE!!  @"+ process.env.PORT);
});
