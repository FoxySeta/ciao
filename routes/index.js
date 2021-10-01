// routes/index.js: home page

const express = require('express'),
  router = express.Router();

router.get('/', function (_, res, __) {
  res.render('index', {title: 'Express'});
});

module.exports = router;
