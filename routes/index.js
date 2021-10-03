// routes/index.js: main route

const router = require('express').Router();

router.get('/', (req, res, _) => {
  res.render('index', {user: req.user});
});

module.exports = router;
