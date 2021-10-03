// routes/auth.js: authentication

const router = require('express').Router();

router.get('/login', (_, res, __) => {
  res.render('login');
});
router.post('/login/password', require('passport').authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));
router.get('/logout', (req, res, _) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
