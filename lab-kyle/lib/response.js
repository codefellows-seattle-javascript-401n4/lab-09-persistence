'use strict';

module.exports = {

  sendStatus: (res, status, text) => {
    res.writeHead(status);
    res.write(text);
    res.end();
  },
  sendJSON: (res, status, data) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(data));
  },

};
