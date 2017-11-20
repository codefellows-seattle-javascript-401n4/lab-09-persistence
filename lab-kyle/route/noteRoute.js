'use strict';

const Note = require('../model/data/noteModel.js');
const router = require('../lib/router.js');
const dbFile = __dirname + '/../model/data/notes.dat';
const storage = require('../lib/storage.js')(dbFile);
const response = require('../lib/response.js');

router.post('/api/notes', (req, res) => {
  if(!req.body.title) {
    return response.sendStatus(res, 404 , 'No Title Found');
  }
  if(!req.body.content) {
    return response.sendStatus(res, 404, 'No Content Found');
  } else {
    let note = new Note(req.body);

    storage.saveItem(note)
      .then(item => response.sendJSON(res, 201, item))
      .catch(err => response.sendStatus(res, 500, err));
  }
});


router.get('/api/notes', (req,res) => {
  let id = req.url && req.url.query && req.url.query.id;

  if(id) {
    storage.getItem(id)
      .then(item => response.sendJSON(res, 200, item))
      .catch(err => response.sendStatus(res, 404, err));
  } else {
    storage.getAll()
      .then(everything => response.sendJSON(res, 200, everything))
      .catch(err => response.sendStatus(res, 404, err));
  }
});
