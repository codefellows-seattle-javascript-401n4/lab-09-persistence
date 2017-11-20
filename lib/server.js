'use strict';

const http = require('http');
const router = require('../lib/router.js');
const note = require('../route/noteRoute.js');

let isRunning = false;

const app = http.createServer(router.route);

module.exports = {
  start: () => {

    return new Promise((resolve, reject) => {
      if (!isRunning){
        app.listen(process.env.PORT, (err) => {
          if (err){
            reject(err);
          } else {
            isRunning = true;
            resolve(`Server up on port ${process.env.PORT}`);
          }
        });
      } else {
        reject('Error: Server is already runnning');
      }
    });
  },

  stop: () => {
    return new Promise((resolve, reject) => {
      if (!isRunning) {
        reject('Error: Server is NOT running');
      } else {
        app.close(err => {
          if(err){
            reject(err);
          } else {
            isRunning = false;
            resolve('Server stopped.');
          }
        });
      }
    });
  },
};
