'use strict';
const Note = require('../note.js');
const router = require('./router.js');
const response = require('../response.js');

let notes = [];

router.get('/api/notes',(req, res) => {
  let id = req.url && req.url.query && req.url.query.id;
  if(id){
    let note = notes.filter((note) => note.id === id);
    if (note) response.sendjson(res, 200, note)
    else response.status(res, 404, "invalid id")
  }
  else{
    let allNotes = {notes:notes};
    response.sendjson(res, 200, allNotes)
  }
});

router.post('/api/notes',(req, res) =>{
    if (!req.body) return response.status(res, 400, "bad request");
    if(!req.body.title) return response.status(res, 400, "Missing Title");
    if(!req.body.content) return response.status(res, 400, "Missing Content");
    let note = new Note(req.body);
    notes.push(note);
    console.log("all notes: ",notes);
    response.sendjson(res, 200, note)
});

router.put('/api/notes',(req, res) =>{
  if(!req.body.title) return response.status(res, 400, "Missing Title");
  if(!req.body.content) return response.status(res, 400, "Missing Content");
  let id = req.url && req.url.query && req.url.query.id;
  if(id){
    let index = notes.indexOf(notes.id);
    notes.splice(index, 1);
    let notePut = new Note(req.body);
    notes.push(notePut);
    console.log("all notes:",notes);
    response.sendjson(res, 200, notes)
  }
});

router.patch('/api/notes',(req, res) => {
  let found = false;
  let id = req.url && req.url.query && req.url.query.id;
  if(id){
    if(!req.body.title) return response.status(res, 400, "Missing Title");
    if(!req.body.content) return response.status(res, 400, "Missing Content");
    for (var index = 0; index<notes.length; index++){
      if (notes[index].id === id){
        let found = true;
        notes[index].title = req.body.title;
        notes[index].content = req.body.content;
        response.sendjson(res, 200, `patched note: ${notes[index]}`);
      }
      if (!found) response.status(res, 400, 'id not found')
    }
  }

});

router.delete('/api/notes',(req, res) => {
    let id = req.url && req.url.query && req.url.query.id;
    if(id){
      notes = notes.filter((ele) => { return ele.id !== id });
      console.log("all notes: ",notes);
          response.sendjson(res, 200, `note ${id} deleted`)
    }else{
      response.status(res, 400, 'id not found')
    }
})
