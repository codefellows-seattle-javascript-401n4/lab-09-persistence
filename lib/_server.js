'use strict';

const http = require('http');
const router = require('./router');
const note = require('./routes/note-routes');

let isRunning = false;

// Just get a server running
const app = http.createServer( router.route );

module.exports = {
  start: () => {
    return new Promise( (resolve, reject) => {
      if(! isRunning) {
        app.listen(process.env.PORT, (err) => {
          if(err) reject(err);
          else {
            isRunning = true;
            resolve(console.log(`Server is running on port: ${process.env.PORT}`));
          }
        });
      } else {
        reject(console.log('Server is already running'));
      }
    });
  },

  stop: () => {
    return new Promise( (resolve, reject) => {
      if(! isRunning) reject(console.log('Server is already off'));
      else {
        app.close( err => {
          if(err) reject(err);
          else {
            isRunning = false;
            resolve(console.log('Stopping server'));
          }
        });
      }
    });
  },
};


// module.exports = {
//   start: (port, cb) => { console.log('Server is up!'); server.listen(port, cb); },
//   stop: (cb) => server.close(cb),
// };
