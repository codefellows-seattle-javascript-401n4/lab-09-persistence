'use strict';

const parser = require('./parse-request');

//route registry
//store route handlers for each of the verbs...
// i.e.
// GET: {
//   "/api/note": (req, res) => {}, ...
// }

const routeHandlers = {
  GET: {},
  PUT: {},
  //route/note.js feeds into these empty objects
  //POST: {'/api/notes': callback}
  POST: {},
  PATCH: {},
  DELETE: {},
};

//the router is going to export the GET method, POST method...
module.exports = {
  get: (uri, callback) => {
    routeHandlers.GET[uri] = callback;
  },
  post: (uri, callback) => {
    routeHandlers.POST[uri] = callback;
  },
  put: (uri, callback) => {
    routeHandlers.PUT[uri] = callback;
  },
  patch: (uri, callback) => {
    routeHandlers.PATCH[uri] = callback;
  },
  delete: (uri, callback) => {
    routeHandlers.DELETE[uri] = callback;
  },

//api.route('/note/id', () => {})

  //this is the router.route in the server.js
  //the router itself returns a promise
  route: (req, res) => {
    //parse the request; request parser feeds the router; the router needs the result from the parser to determine what the method is and which api method to run on it
    //see if the request is valid... return a 400 if the request itself is invalid
    //find the handler
    //404 if it's not here
    //execute handler

    parser(req)
      .then( (req) => {
        //find the handler
        let handler = routeHandlers[req.method][req.url.pathname];
        if(handler) {
          return handler(req,res);
        } else {
          console.error('not found', req.url.pathname);
          res.writeHead(404);
          res.end();
        }
      })
      //if router is not created yet then .catch(error) but you still have to create your own route; it does not automatically create one for you
      .catch((error) => {
        console.log('invalid request', error);
        res.writeHead(400);
        res.end();
      });
  },
};
