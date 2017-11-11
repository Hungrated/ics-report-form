const express = require('express');
const pathLib = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const app = express();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

(function() {
  // cookie handler
  app.use(cookieParser());

  // session handler
  let arr = [];
  for (let i = 0; i < 100000; i++) {
    arr.push('keys_' + Math.random());
  }
  app.use(cookieSession({
    name: 'session_id',
    keys: arr,
    maxAge: 30 * 3600 * 1000
  }));
})();

// static resources handler
app.use(express.static(pathLib.join(__dirname, 'public')));

app.use('/api/data', require('./routes/route_data'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.json(statusLib.SERVER_INNER_ERROR);
});


module.exports = app;