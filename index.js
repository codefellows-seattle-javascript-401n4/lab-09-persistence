const Storage = require('./data/storage.js');
let Note = require('./data/note.js');

let storage = new Storage();

'use strict';

require("dotenv").config();

require('./lib/server.js').start(process.argv[2] || process.env.PORT || 3000)
    .then(serverReply => console.log(serverReply))
    .catch(serverError => console.log('Server error: ', serverError));