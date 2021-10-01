// app.js: app component

const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  indexRouter = require('./routes/index'),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
// 404
app.use((_, __, next) => {
  next(createError(404));
});
// error handler
app.use((err, _, res, __) => {
  res.locals.message = err.message;
  res.locals.error = err
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
