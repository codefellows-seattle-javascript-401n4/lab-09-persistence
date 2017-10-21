'use strict';

const send = module.exports = {};

send.JSON = function(res, status, data){
  res.writeHead(status, {'content-type': 'application/json'});
  res.end(JSON.stringify(data));
};

send.status = function(res, status, text){
  res.writeHead(status);
  res.write(text);
  res.end();
};
