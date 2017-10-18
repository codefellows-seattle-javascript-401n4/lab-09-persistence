'use strict';

const parser = require('./parse-request');


const routeHandlers = {
  GET: {},
  PUT: {},
  POST: {},
  PATCH: {},
  DELETE: {},
};

module.exports = {
  get: (uri, callback) => {
    routeHandlers.GET[uri] = callback;

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
    parser(req)
    .then((req) => {
      let handler = routeHandlers[req.method][req.url.pathname];
      // console.log('handler ', handler);
      if( handler){
        return handler(req,res);
      }else{
        console.error('NOT_FOUND', req.url.pathname);
        res.writeHead(404);
        res.end();
      }
    })
    .catch((err) => {
      console.error('INVALID_REQUEST', err);
      res.writeHead(400);
      res.end();
    });

  },
};
