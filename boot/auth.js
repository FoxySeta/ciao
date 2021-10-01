// boot/auth.js: Passport initialization

import {use, serializeUser, deserializeUser} from 'passport';
import Strategy from 'passport-local';
import {pbkdf2, timingSafeEqual} from 'crypto';
import {get} from '../db';

export default function () {
  use(new Strategy(function (username, password, cb) {
    get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], function (err, row) {
      if (err)
        return cb(err);
      if (!row)
        return cb(null, false, {message: 'Incorrect username or password.'});
      pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err)
          return cb(err);
        if (!timingSafeEqual(row.hashed_password, hashedPassword))
          return cb(null, false, {message: 'Incorrect username or password.'});
        return cb(null, {
          id: row.id.toString(),
          username: row.username,
          displayName: row.name
        });
      });
    });
  }));
  serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, {id: user.id, username: user.username});
    });
  });
  deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
