'use strict';
//request-parser feeds the router...the router needs request-parser in order to be able determine what the method is and which API method to run on it
const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {
  return new Promise( (resolve, reject) => {
    //url parser
    req.url = url.parse(req.url);
    //query parser
    req.url.query = queryString.parse(req.url.query);
    //   /route/foo?say=hello
    //   req.url.query = { say: "hello"}
    //  req.url.query.say


// put/post/patch is different from get/delete because put/post/patch has a body; whereas get/delete take in an ID
    if(! (req.method === 'PUT'|| req.method === 'POST' || req.method === 'PATCH')) {
      resolve(req);
    }

    //if it's a write operation that has a body, then we have to build up the body as we're receiving the data
    let text = ''; //text buffer

    //build up text as we read data
    req.on('data', (buffer) => {
      text += buffer.toString();
    });

    //JSONify it/converting it into json, if the request is for application/JSONify
    //handle errors
    req.on('end', () => {
      try{
        if(req.headers['content-type'] === 'application/json') {
          //converting into an actual object
          req.body = JSON.parse(text);
        }
        //resolve the request with the parsed url
        resolve(req);
      }
      catch(error) {
        //if not json then reject
        reject(error);
      }
    });
    //if there is an error on the whole project then reject
    req.on('error', reject);
  });

};
