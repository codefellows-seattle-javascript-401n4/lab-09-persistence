'use strict';
//request-parser feeds the router...the router needs request-parser in order to be able determine what the method is and which API method to run on it
const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {
  return new Promise( (resolve, reject) => {
    //url
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    //   /route/foo?say=hello
    //   req.url.query = { say: "hello"}
    //  req.url.query.say


// put/post/patch is different from get/delete because put/post/patch has a body
    if(! (req.method === 'PUT'|| req.method === 'POST' || req.method === 'PATCH')) {
      resolve(req);
    }

    let body = ''; //text buffer

    //build up text as we read data
    req.on('data', (buffer) => {
      body += buffer.toString();

    });

    //JSONify it, if the request is for application/JSONify
    //handle errors
    req.on('end', () => {
      req.body = JSON.parse(body);
    });

    req.on('error', reject);
  });
};
