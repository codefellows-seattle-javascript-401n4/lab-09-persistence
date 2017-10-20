'use strict';

module.exports = {

  status: (res, status, data) => {
    res.writeHead(status);
    res.end(data);
  },
  sendjson: (res, status, data) => {
    res.writeHead(status, {"Content-Type":"application/json"});
    res.end(JSON.stringify(data));
  }

}
