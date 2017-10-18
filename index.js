'use strict';

require('dotenv').config();

const server = require('./lib/server');
require('./note/route');
const Note = require('./note/model.js');

Note.loadAll();

server.start(process.env.PORT)
  .then(console.log)
  .catch(console.log);
