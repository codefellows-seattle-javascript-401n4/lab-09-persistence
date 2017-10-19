'use strict';
const parse = require('./body-parser');
const routeHandlers = {
  GET: {},
  PUT: {},
  POST: {},
  PATCH: {},
  DELETE: {}
};
module.exports = {
  get: (uri, callback) => {
    routeHandlers.GET[uri] = callback;
  },
  put: (uri, callback) => {
    routeHandlers.PUT[uri] = callback;
  },
  post: (uri, callback) => {
    routeHandlers.POST[uri] = callback;
  },
  patch: (uri, callback) => {
    routeHandlers.PATCH[uri] = callback;
  },
  delete: (uri, callback) => {
    routeHandlers.DELETE[uri] = callback;
  },
  route: (req, res) => {
  // parse req
  //return 400 if invalid
  //find handler (400 if not there)
  parse(req)
  .then( (req) => {
    // console.log("post:", routeHandlers[req.method]);
    let handler = routeHandlers[req.method][req.url.pathname];
    if (handler) return handler(req, res)
    else {
      console.log('not found: ', req.method, req.url.pathname);
      res.writeHead(400);
      res.end();
    }
  })
  .catch((err) => {
    console.error('invalid request ', err);
    res.writeHead(400);
    res.end();
  })
 }
}
