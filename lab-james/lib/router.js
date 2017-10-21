'use strict';

const parser = require('./parse-request.js');
const routeHandlers = module.exports = {};

const router = module.exports = {
  route: (req, res) => {
    parser(req)
      .then( (req) => {
        let handler = routeHandlers[req.method][req.url.pathname];
        if(handler){

          handler(req, res);

        } else {

          console.error('Not Found', req.url.pathname);
          res.writeHead(404);
          res.write('Path not found');
          res.end();

        }
      })
      .catch( (err) => {
        console.error('Invalid Request', err);
        res.writeHead(400);
        res.write('Invalid Request');
        res.end();
      });
  },
};

let methods = ['get', 'put', 'post', 'patch', 'delete'];

methods.forEach(method => {
  routeHandlers[method.toUpperCase()] = {};
  router[method] = function(pathname, callback){
    routeHandlers[method.toUpperCase()][pathname] = callback;
  };
});
