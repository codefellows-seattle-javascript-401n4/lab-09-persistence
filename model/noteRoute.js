'use strict';

const Note = require('../model/note');
const router = require('../lib/router');

const databaseFile = __dirname + '/../model/data.notes.dat';
const storage = require('../lib/storage')(databaseFile);


//route/note.js deals with different RESTful endpoints to handle the model
let sendStatus = (res, status, text) => {
  res.writeHead(status);
  res.write(text);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type':'application/json',
  });
  res.end(JSON.stringify(data));
};

//RESTful endpoints: /api/notes
router.post('/api/notes', (req,res) => {
  if(! req.body.title) {
    return sendStatus(res, 400, 'title is missing');
  }
  if(! req.body.content) {
    return sendStatus(res, 400, 'content is missing');
  }

  let note = new Note(req.body);

  storage.saveItem(note)
    .then( item => sendJSON(res, 201, item) )
    .catch( error => sendStatus(res, 500, error) );
});

router.get('/api/notes', (req,res) => {
  let id = req.url && req.url.query && req.url.query.id;

  if(id) {
    storage.getItem(id)
      .then( item => sendJSON(res, 200, item) )
      .catch( error => sendStatus(res, 404, error) );
  } else {
    storage.getItems()
      .then( allNotes => sendJSON(res, 200, allNotes) )
      .catch( error => sendStatus(res, 404, error) );
  }
});

router.delete('/api/notes', (req,res) => {
  let id = req.url && req.url.query && req.url.query.id;

  if(id) {
    storage.deleteItem(id)
      .then(sendJSON(res, 200, 'Successfully Deleted'))
      .catch(error => sendStatus(res, 500, error));
  }
});
