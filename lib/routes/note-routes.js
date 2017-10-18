'use strict';

const Note = require('../../model/note');
const router = require('../router');
const response = require('../response');
const note_file = __dirname + '/../model/note_db';

let notes = [];


router.get('/api/notes', (req, res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if(id){

    let note = notes.filter((note) => {
      return note.id === id;
    });

    if(note) response.json(res, 200, note);
    else response.status(res, 400, 'Invalid Note');

  } else {

    //return all notes in array
    let showAll = { notes: notes };
    response.json(res, 200, showAll);

  }

});

router.post('/api/notes', function(req, res) {

  //check for title and content in JSON request, or error
  if(! req.body.title) response.status(res, 400, 'Missing Title');
  if(! req.body.content) response.status(res, 400, 'Missing Content');

  let note = new Note(req.body);
  notes.push(note);
  response.json(res, 200, note);

});

router.put('/api/notes', function(req, res) {

  if(! req.body.title) response.status(res, 400, 'Missing Title');
  if(! req.body.content) response.status(res, 400, 'Missing Content');

  let id = req.url && req.url.query && req.url.query.id;

  if(id){

    //return a new note array without the note that is to be updated
    notes = notes.filter((note) => {
      return note.id !== id;

    });
    let updatedNote = new Note(req.body);
    notes.push(updatedNote);
    response.json(res, 200, updatedNote);

  } else { response.status(res, 400, 'Invalid Note'); }

});

router.patch('/api/notes', function(req, res) {

  let id = req.url && req.url.query && req.url.query.id;

  if(! req.body.title && ! req.body.content) response.status(res, 400, 'No content!');
  if(! id) response.status(res, 400, 'Bad Request');
  else {
    let success = false;

    //update existing note if match
    for(let note in notes){
      if(notes[note].id === id){
        if(req.body.title) notes[note].title = req.body.title;
        if(req.body.content) notes[note].content = req.body.content;
        success = true;
        response.json(res, 200, notes[note]);
      }
    }
    if(!success) response.status(res, 400, 'No match for id');
  }
});

router.delete('/api/notes', function(req, res) {

  let id = req.url && req.url.query && req.url.query.id;

  if(id){

    notes = notes.filter((note) => {
      return note.id !== id;
    });
    response.status(res, 204);

  } else {
    response.status(res, 400, 'Bad Request');
  }

});
