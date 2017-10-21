'use strict';

const parser = require('../lib/requestParser.js');


const routes = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
};


module.exports = {
  get: (pathname,callback) => {
    routes.GET[pathname] = callback;
  },

  post: (pathname,callback) => {
    routes.POST[pathname] = callback;
  },

  put: (pathname,callback) => {
    routes.PUT[pathname] = callback;
  },

  delete: (pathname,callback) => {
    routes.DELETE[pathname] = callback;
  },

  route: (req,res) => {
    parser(req)
    .then( (req) => {
      let routeHandler = routes[req.method][req.url.pathname];
      if(routeHandler){
        return routeHandler(req,res);
      }
      else{
        console.log('Not_Found', req.url.pathname);
        res.writeHead(404);
        res.end();
        return;
      }
    })
    .catch( (err) => {
      console.log('Invalid_Request', err);
      res.writeHead(400);
      res.end();
      return;
    });
  },
};
