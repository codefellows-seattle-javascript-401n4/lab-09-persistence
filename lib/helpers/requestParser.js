'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = (req) => {

  return new Promise((resolve, reject) => {

    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);

    let jsonMethods = ['POST', 'PUT', 'PATCH'];

    if(jsonMethods.indexOf(req.method) !== -1) {

      let text = '';

      req.on('data', (buffer) => {
        text += buffer.toString();
      });

      req.on('end', () => {
        try {
          if(req.headers['content-type'] === 'application/json') {
            
            req.body = JSON.parse(text);
          }
          resolve(req);
        }
        catch(err) {
          reject(err);
        }
      });
      req.on('error', reject);

    }  else {

      resolve(req);

    }
  });
};
