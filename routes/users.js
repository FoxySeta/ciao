// routes/users.js: registration process

const crypto = require('crypto'),
  router = require('express').Router();

router.get('/new', (_, res, __) => {
  res.render('signup');
});
router.post('/', (req, res, next) => {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, password) => {
    if (err)
      return next(err);
    require('../db').run('INSERT INTO Users (email, password, salt, name) VALUES (?, ?, ?, ?)', [
      req.body.username,
      password,
      salt,
      req.body.name
    ], err => {
      if (err)
        return next(err);
      req.login({
        id: this.lastID.toString(),
        username: req.body.username,
        name: req.body.name
      }, err => {
        if (err)
          return next(err);
        res.redirect('/');
      });
    });
  });
});

module.exports = router;
