const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');

const loggers = (app) => {
  app.all("/", (req, resp, next) => { console.info(`${req.connection.remoteAddress} - ${req.method} ${req.get('host')}`); next(); });
  app.use(logger('dev'));
}

const errorHandlers = (app) => {

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use((req, res, next) => {

    if(req.headers.host)
      res.redirect('https://' + req.headers.host);

  })

  // catch 404 and forward to error handler
  app.use((req, res, next) => next(createError(404)) );
  app.use((err, req, res) => {
    res.locals.message = err.message; // set locals, only providing error in development
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500); // render the error page
    res.render('error');
  });

}

module.exports = { loggers, errorHandlers };
