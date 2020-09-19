var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var bonusRouter = require('./routes/bonus');
var workRouter = require('./routes/work');


var app = express();
// const shouldCompress = (req, res) => {
//   if (req.headers['x-no-compression']) {
//     return false
//   }
//   return compression.filter(req, res);
// }
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
// app.use(compression({
//   filter: shouldCompress,
//   level: 7,
// }));
app.use(compression());


// view engine setup express-handlebars


app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  extname: 'handlebars',
  defaultLayout: 'index.handlebars',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir:__dirname + '/views/partials',
}));
// Кэширование шаблонов (???)
app.enable('view cache');

app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());

app.use('/work', workRouter);
app.use('/bonus', bonusRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
