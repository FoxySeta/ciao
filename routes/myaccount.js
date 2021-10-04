// routes/myaccount.js: show user profile

const router = require('express').Router();

router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res, next) => {
    require('../db').get('SELECT rowid AS id, email, name, qrcode FROM Users WHERE rowid = ?', [req.user.id], (err, row) => {
      if (err)
        return next(err);
      require('../db').get('SELECT name, email FROM Users JOIN Friendships ON email = Friendships.user_email1 WHERE Friendships.user_email2 = ?', [req.user.email], (err, rows) => {
        if (err)
          return next(err);
        res.render('profile', {
          user: {
            id: row.id.toString(),
            username: row.email,
            name: row.name,
            qrcode: row.qrcode,
            friends: [{name: 'Mickey Mouse', email: 'mickey.mouse@disney.com'}]
          }
        });
      });
    });
  });

module.exports = router;
