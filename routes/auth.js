// routes/auth.js: authentication

const router = require('express').express.Router();

router.get('/login', function (_, res, __) {
  res.render('login');
});
router.post('/login/password', require('passport').authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
