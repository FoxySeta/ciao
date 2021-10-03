// routes/auth.js: Passport initialization

const passport = require('passport'),
  crypto = require('crypto');

module.exports = function () {
  passport.use(new require('passport-local')(function (username, password, cb) {
    require('../db').get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], function (err, row) {
      if (err)
        return cb(err);
      if (!row)
        return cb(null, false, {message: 'Incorrect username or password.'});
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err)
          return cb(err);
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword))
          return cb(null, false, {message: 'Incorrect username or password.'});
        return cb(null, {
          id: row.id.toString(),
          username: row.username,
          displayName: row.name
        });
      });
    });
  }));
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, {id: user.id, username: user.username});
    });
  });
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
