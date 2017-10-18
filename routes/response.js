'use strict';


const res = module.exports = {};

res.fourHundred = function(res){
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
  return;
};
