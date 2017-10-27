'use strict';

let router = module.exports = exports = {};
router.routeHandlers = {};
let methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

methods.forEach((method) => {
  router.routeHandlers[method] = {};
  router[method] = function(pathname, callback){
    router.routeHandlers[method][pathname] = callback;
  }
});

router.couldNotFind = function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Could not parse object');
        res.end();
      }
