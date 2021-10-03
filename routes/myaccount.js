// routes/myaccount.js: show user profile

const router = require('express').Router();

router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res, next) {
    require('../db').get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [req.user.id], function (err, row) {
      if (err)
        return next(err);
      res.render('profile', {
        user: {
          id: row.id.toString(),
          username: row.username,
          displayName: row.name
        }
      });
    });
  });

module.exports = router;
