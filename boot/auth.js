// boot/auth.js: Passport initialization

const passport = require('passport'),
  Strategy = require('passport-local'),
  crypto = require('crypto');

module.exports = () => {
  passport.use(new Strategy(function (email, password, cb) {
    require('../db').get('SELECT rowid AS id, * FROM Users WHERE email = ?', [email], function (err, row) {
      if (err)
        return cb(err);
      if (!row)
        return cb(null, false, {message: 'Incorrect email.'});
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, password) => {
        if (err)
          return cb(err);
        if (!crypto.timingSafeEqual(row.password, password))
          return cb(null, false, {message: 'Incorrect password.'});
        return cb(null, {
          id: row.id.toString(),
          username: row.email,
          name: row.name
        });
      });
    });
  }));
  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, {id: user.id, username: user.username});
    });
  });
  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user)
    );
  });
};
