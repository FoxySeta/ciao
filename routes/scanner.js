// routes/scanner.js: add a new friend

const router = require('express').Router();

router.all('/',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res, next) => {
    const u1 = req.query.email, u2 = req.user.username;
    if (typeof u1 !== 'undefined' && u1 !== u2)
      require('../db').run('INSERT INTO Friendships (user_email1, user_email2) VALUES (?, ?), (?, ?)', [u1, u2, u2, u1], (err) => {
        if (err)
          next(err);
      });
    res.redirect('../myaccount');
  });

module.exports = router;
