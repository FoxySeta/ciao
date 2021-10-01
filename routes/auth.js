// routes/auth.js: routes used or authentication

import {Router} from 'express';
import {authenticate} from 'passport';

const router = Router();

router.get('/login', function (_, res, _) {
  res.render('login');
});
router.post('/login/password', authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));
router.get('/logout', function (req, res, _) {
  req.logout();
  res.redirect('/');
});

export default router;
