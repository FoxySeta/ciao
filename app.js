// app.js: application component

const express = require('express'),
  passport = require('passport'),
  path = require('path'),
  app = express();

require('./boot/db')();
require('./boot/auth')();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({secret: process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(function (req, res, next) {
  const msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/myaccount', require('./routes/myaccount'));
app.use('/users', require('./routes/users'));
app.use('/scan', require('./routes/scanner'));

module.exports = app;
