'use strict';

const Note = require('../../model/note');
const router = require('../router');
const response = require('../response');

const note_file = __dirname + '/../../model/note_db.json';
const store = require('../store')(note_file);


router.get('/api/notes', (req, res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if(id) {
    store.getNoteByIDs(id)
    .then(note => response.json(res, 200, note))
    .catch(err => response.status(res, 404, err));

  } else {

    store.getAllNotes()
    .then(all => { response.json(res, 200, all);})
    .catch(err => response.status(res, 500, err));
  }

});

router.post('/api/notes', function(req, res) {

  //check for title and content in JSON request, or error
  if(! req.body.title) response.status(res, 400, 'Missing Title');
  if(! req.body.content) response.status(res, 400, 'Missing Content');

  let note = new Note(req.body);
  store.saveNote(note)
  .then(n => response.json(res, 200, n))
  .catch(err => response.status(res, 500, err));
});


router.delete('/api/notes', function(req, res) {

  let id = req.url && req.url.query && req.url.query.id;

  if(id){

    store.deleteNote(id)
    .then(response.json(res, 204))
    .catch(err => response.status(res, 500, err));

  } else {
    response.status(res, 400, 'Bad Request');
  }

});
