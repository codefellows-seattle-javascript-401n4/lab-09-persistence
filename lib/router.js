'use strict';
const requestParser = require('./helpers/requestParser');

// Route Registry
// Store route handlers for each of the verbs ...
/*
    i.e.
    GET: {
        "/api/note" : (req, res) => {},  ....
    }
*/
const routeHandler = {
  GET: {},
  PUT: {},
  POST: {},
  PATCH: {},
  DELETE: {},
};

module.exports = {
  get: (uri, callback) => {
    routeHandler.GET[uri] = callback;
  },
  post: (uri, callback) => {
    routeHandler.POST[uri] = callback;
  },
  put: (uri, callback) => {
    routeHandler.PUT[uri] = callback;
  },
  patch: (uri, callback) => {
    routeHandler.PATCH[uri] = callback;
  },
  delete: (uri, callback) => {
    routeHandler.DELETE[uri] = callback;
  },
  route: (req, res) => {
    requestParser(req).then((req) => {

      let handler = routeHandler[req.method][req.url.pathname];

      if(handler) { return handler(req, res); }

      else { require('./routes/404').display_404(res); }

    }).catch((err) => {
      require('./routes/400').display_400(res, err);});
  },
};
