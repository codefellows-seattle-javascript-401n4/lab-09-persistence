'use strict';


const response = module.exports = {


  status: (res, status, msg) => {

    res.writeHead(status);
    res.write(msg);
    res.end();

  },

  json: (res, status, data) => {

    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));

  },


};
