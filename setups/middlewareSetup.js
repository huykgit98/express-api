
const webUtils = require('../utils/webUtils');
const config = require('../configs/middlewareConfig');

const addMiddleware = ((app, middleware) => {
  const { args } = middleware;
  if (args) {
    if (args === 'DEFAULT') {
      app.use((req, res, next) => {
        middleware.method(req, res, next);
      });
    } else {
      app.use(middleware.method(args));
    }
  } else {
    app.use(middleware.method());
  }
});

exports.setup = (app) => {
  console.log('########## Middlewares setup:::::::::::');
  // Configure application middlewares

  config.APP_MIDDLEWARES.forEach((middleware) => {
    addMiddleware(app, middleware);
  });
};

exports.handlerError = (app) => {
  console.log('########## GLOBAL Error Handler setup:::::::::::');
  app.use((err, req, res, next) => {
    console.log('Throwing error name = ', err.name);
    webUtils.responseError(res, err, next);
  });
};
