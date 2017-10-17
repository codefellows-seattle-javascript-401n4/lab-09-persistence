// 'use strict';
//
// let router = module.exports = exports = {};
//
// router.routes = {};
//
// let methods = ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD'];
//
// methods.forEach((method) => {
//   router.routes[method] = {};
//   router[method.toLowerCase()] = function(pathname, callback) {
//     router.routes[method][pathname] = callback;
//   };
// });
//
// router.fourOFour = function(req, res) {
//   res.writeHead(404, {'Content-Type': 'text/plain'});
//   res.write('could not find page');
//   res.end();
// };

'use strict';

const parser = require("./parse-request");

//route registry
//store route handlers for each of the verbs...
/*
i.e.
GET: {
  "/api/note": (req, res) => {}, ...
}
*/

const routeHandlers = {
  GET: {},
  PUT: {},
  POST: {},
  PATCH: {},
  DELETE: {}
};

//the router is going to export the GET method, POST method...
module.exports = {
  get: (uri, callback) => {
    routeHandlers.GET[uri] = callback;
  },

  //this is the router.route in the server.js
  route: (req, res) => {
    //parse the request
    //see if the request is valid... return a 400 if the request itself is invalid
    //find the handler
        //404 if it's not here
    //execute handler
  }
};

api.route("/note/id")
