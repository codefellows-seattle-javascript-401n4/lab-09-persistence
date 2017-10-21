'use strict';

const http = require('http');
const router = require('./router');
const noteRouter = require('../route/note'); //allows server to handle note routes

let isRunning = false;

//just get a server running
const app = http.createServer(router.route); //feed server the route (normally in the past we pass in (res, req))...here the route will take care of res and req for us


//exporting start and stop methods
module.exports = {
  //start method is returning a promise//the whole server is promise-based
  start: (port) => {
    return new Promise ( (resolve, reject) => {
      if(! isRunning) {
        app.listen(port, (error) => {
          if(error) {
            reject(error);
          } else {
            isRunning = true;
            resolve(`Server is up on port ${port}`);
          }
        });
      } else {
        reject('Server is already running');
      }
    });
  },

  stop: () => {
    return new Promise( (resolve, reject) => {
      if (! isRunning) {
        reject('Server is already stopped running');
      } else {
        app.close( error => {
          if(error) {
            reject (error);
          } else {
            isRunning = false;
            resolve('Shutting down');
          }
        });
      }
    });
  },
};
