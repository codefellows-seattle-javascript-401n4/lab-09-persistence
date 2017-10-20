'use strict';

const http = require('http');
const router = require('./router');
const route = require('../car/route');


let isRunning = false;

// Just get a server running
const app = http.createServer(router.route);

module.exports = {
  start: () => {
    return new Promise( (resolve, reject) => {
      if( ! isRunning ) {
        app.listen(process.env.PORT, (err) => {
          if( err ){
            reject(err);
          }else{
            isRunning = true;
            resolve(`Server is up on port ${process.env.PORT}`);
          }
        });
      }else{
        reject('server is already running');
      }
    });
  },

  stop: () => {
    return new Promise( (resolve,reject) => {
      if(! isRunning){
        reject('Server is currently off');
      }else{
        app.close(err => {
          if( err ){
            reject( err );
          } isRunning = false;
          resolve('shutting down');
        });
      }
    });

  },
};
