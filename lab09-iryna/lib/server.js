'use strict';
const http = require('http');
const router = require('./router');
const note = require('./note-router');
// require('dotenv').config();
const app = module.exports = http.createServer(router.route);
let isRunning = false;

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if (! isRunning){
        app.listen(process.env.PORT, (err) => {
          if (err) reject(err);
          else {
            isRunning = true;
            resolve(console.log(`Server running on port ${process.env.PORT}`));
          }
        })
      }
      else reject(console.log(`Server is already running on port ${process.env.PORT}`));
    })
  },
  stop: () => {
    return new Promise((resolve, reject) => {
        if(!isRunning){
          reject(console.log('server is already off'));
        }
        else{
          app.close(err => {
            if (err) reject(err)
            else {
              isRunning = false;
              resolve(console.log('Shutting down'));
            }
          })
        }
    })
  }
}
// server.listen(process.env.PORT, console.log('running on', process.env.PORT));
