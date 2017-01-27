const app = require('../index.js');
const db = app.get('db');

module.exports= {
  googleAuth: (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    db.getUserByGoogleId([profile.id], function(err, user) {
      if (!user.length) {
        db.getUserByEmail([profile.email], function (err, user) {
          if (user.length) {
            db.updateUserGoogleId([profile.id, profile.email], function (err, user) {
              return cb (err, user[0], {scope:'all'});
            });
          }else {
            db.createUserGoogle([profile.displayName, profile.id , profile.email], function(err, user) {
              return cb(err, user[0], {scope: 'all'});
            });
          }
        });
      } else {
        return cb(err, user[0]);
      }
    });
  },
  facebookAuth: (accessToken,refreashToken, profile, cb) => {
    db.getUserByFacebookId([profile.id], function(err, user) {
      if (!user.length) {
        db.getUserByEmail([profile.emails[0].value], function (err, user) {
          if (user.length) {
            db.updateUserFacebookId([profile.id, profile.emails[0].value],function (err, user) {
              return cb ( err, user[0], {scope: 'all'});
            });
          }else {
            db.createUserFacebook([profile.displayName, profile.id , profile.emails[0].value], function(err, user) {
              return cb(err, user[0], {scope: 'all'});
            });
          }
        });
      } else {
        return cb(err, user[0]);
      }
    });
  },
  serializeUser: (user, done) => {
    return done(null, user);
  },
  deserializeUser: (user, done) => {
    if (!user.facebookid) {
      db.getUserByUsername([user.username], function(err, u){
        return done(null,u);
      });
    }
    else {
      db.getUserByFacebookId([user.facebookid], function(err, user) {
        done(null, user);
      });
    }

  },
  facebookCallback: (req, res) => {
    res.redirect('/#/');
    console.log(req.session);
  },

};
