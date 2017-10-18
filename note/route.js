'use strict';

const Note = require('../model/note.js');
const router = require('../lib/router.js');


let notes = [];

let sendStatus = (res, status, text) => {
  res.writeHead(status);
  res.write(text);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(data));
  res.end();

};

router.post('/api/notes', (req,res) => {
  if ( ! req.body.title ){
    return sendStatus(res, 400, 'Missing title');
  }
  if ( ! req.body.content ){
    return sendStatus(res, 400, 'Missing content');
  }

  let note = new Note(req.body);
  notes.push(note);



  sendJSON(res,200, note);
});

router.get('/api/notes', (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;



  if ( id ){
    let note = notes.filter( (note) => {
      return note.id === id;
    });
    if(note){
      sendJSON(res, 200, note);
    }else{
      sendStatus(res, 400, 'Invalid Note');
      console.log('hello');
    }
    let allNotes = {notes:notes};
    sendJSON(res, 200, allNotes);
  }
});
