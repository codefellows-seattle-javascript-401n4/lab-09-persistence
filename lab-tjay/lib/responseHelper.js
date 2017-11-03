
'use strict';

module.exports = (res) => {
  res.sendText = (status, text) => {
    res.writeHead(status, {
      'Content-Type': 'text/plain',
    });
    res.write(text);
    res.end();
  };

  res.sendStatus = (status) => {
    res.writeHead(status);
    res.end();
  };

  res.sendJSON = (status, json) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(json));
    res.end();
  };
};
