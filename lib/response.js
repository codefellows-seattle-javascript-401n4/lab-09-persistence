'use strict';

const res = module.exports = {};


res.sendStatus = function(res,status,text){
  res.writeHead(status);
  res.write(text);
  res.end();
  return;
};

res.sendJSON = function(res,status,data){
  res.writeHead(status);
  res.write(JSON.stringify(data));
  res.end();
  return;
};
