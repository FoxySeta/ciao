// routes/myaccount.js: show user profile

const router = require('express').Router();

router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res, next) => {
    require('../db').get('SELECT rowid AS id, email, name, qrcode FROM users WHERE rowid = ?', [req.user.id], function (err, row) {
      if (err)
        return next(err);
      res.render('profile', {
        user: {
          id: row.id.toString(),
          email: row.email,
          name: row.name,
          qrcode: row.qrcode
        }
      });
    });
  });

module.exports = router;
