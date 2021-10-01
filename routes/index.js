// routes/index.js: home page

import {Router} from 'express';
const router = Router();

router.get('/', function (_, res, _) {
  res.render('index', {title: 'Express'});
});

export default router;
