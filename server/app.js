var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var charityRouter = require('./routes/charityRouter');
var coverPicRouter = require('./routes/coverPicRouter');

var app = express();

// connect to mongodb
var url = config.mongoUrl;
const connect = mongoose.connect(url);
//Mongoose creates a default connection when you call mongoose.connect().
//You can access the default connection using mongoose.connection.
connect.then(() => {
     console.log('mongoDB connect successfully');
});


// redirect to secure ports
app.all('*', (req, res, next) =>{
     // request coming through secure port
     if(req.secure){
          next();//do nothing
     }
     else{
          res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
     }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/charities', charityRouter);
app.use('/coverpics', coverPicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;