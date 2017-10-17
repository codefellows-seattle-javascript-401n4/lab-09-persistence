'use strict';

const http = require("http");
const router = require("./router");
const note = require("../route/note")

let isRunning = false;

//just get a server running
const app = http.createServer(router.route); //feed server the route (normally in the past we pass in (res, req))...here the route will take care of res and req for us

module.exports = {
  //start method is returning a promise//the whole server is promise-based
  start: () => {
    return new Promise ( (resolve, reject) => {
      //start//if it's not running, do I start it?
      //running?
      //handle error
    });
  },

  stop: () => {
    return new Promise( (resolve, reject) => {
      //running?
      //kill //has it already been stopped? do I kill it? how do I kill?
      //handle error //how do I handle error messages
      //check
    });
  },
};


// 'use strict';
//
// const http = require('http');
// const url = require('url');
// const router = require('./lib/router');
//
// router.get('/', function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('hello world!');
//   res.end();
// });
//
// router.post('/', function(req,res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('hello from post');
//   res.end();
// });
//
// router.patch('/', function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('hello from patch');
//   res.end();
// });
//
// const server = http.createServer(function(req, res) {
//   req.url = url.parse(req.url);
//
//   (router.routes[req.method][req.url.pathname] || router.fourOFour)(req, res);
// });
//
// server.listen(3000);
