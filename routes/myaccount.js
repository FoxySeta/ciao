// routes/myaccount.js: show profile

import {Router} from 'express';
import {ensureLoggedIn} from 'connect-ensure-login';
import {get} from '../db';

const router = Router();

router.get('/',
  ensureLoggedIn(),
  function (req, res, next) {
    get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [req.user.id], function (err, row) {
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

export default router;
