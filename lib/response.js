'use strict';

const res = module.exports = {};


res.sendStatus = function(res,status,text){
  res.writeHead(status);
  res.write(text);
  res.end();
};

res.sendJSON = function(res,status,data){
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
};
