'use strict';


const http = require("http");
const router = require("./route.js");
const url = require("url");
let notes = {};

let isRunning = false;

// Just get a server running
const app = http.createServer( function(req, res) {
  req.url = url.parse(req.url);

  (router.routeHandlers[req.method][req.url.pathname] ||
  router.couldNotFind)(req, res);
});

module.exports = {
    start: (port) => {
        return new Promise( (resolve, reject) => {
            (isRunning) ? resolve('Server is already running') : (app.listen(port, (err) => reject(err)), isRunning = true ,resolve(`Server is running on port: ${port}`));
        });
    },

    stop: () => {
        return new Promise( (resolve,reject) => {
            (isRunning) ? (app.close(), isRunning = false, resolve('Server stopped')) : reject('Server is already stopped');
            if (isRunning) reject('Server is still running for some reason. Try again');
        });

    }
}
