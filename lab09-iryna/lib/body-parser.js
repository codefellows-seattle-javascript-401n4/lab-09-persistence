'use strict';
const url = require('url');
const queryString  = require('querystring');
const route = require('./router.js');

module.exports = (req) => {
  // console.log("request:", req.url);
  return new Promise((resolve, reject) => {
    req.url = url.parse(req.url);
    // console.log("in body parse: req.url:",req.url)
    req.url.query = queryString.parse(req.url.query);
    // console.log("in body parse. req.url.query: ",req.url.query)
    if (!(req.method === "PUT" || req.method === "POST" || req.method === "PATCH")) resolve(req);

    let text = "";
    req.on("data", (buffer)=>{
      text += buffer.toString();
    });
    req.on("end", ()=>{
      try{
        if (req.headers['content-type']==='application/json') req.body = JSON.parse(text);
        resolve(req);
      }
      catch(err){
        reject(err)
      }
    });
    req.on("error", reject);
  });
}
