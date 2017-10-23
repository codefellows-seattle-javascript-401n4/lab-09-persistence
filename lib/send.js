'use strict';

const sender = module.exports = {};

sender.message = (res, status, text) => {
  res.writeHead(status);
  res.write(text);
  res.end();
};

sender.json = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type':'application/json',
  });
  res.end(JSON.stringify(data));
};
