'use strict';

module.exports = {

  sendStatus: (res, status, data) => {
    res.writeHead(status);
    res.end(data);
  },
  sendJSON: (res, status, data) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(data));
  },

};
