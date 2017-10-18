'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {

  return new Promise( (resolve, reject) => {
    // URL
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (! ( req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH' ) ) {
      resolve(req);
    }

    let text = '';
    req.on('data', (buffer) => {
      text += buffer.toString();
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(text);
        resolve(req);
      } catch(e){
        reject (`not a good json ${text}`);
      }
    });
    req.on('error', reject);
  });

};
