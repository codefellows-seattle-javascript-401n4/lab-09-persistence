'use strict';
const Note = require('../note.js');
const router = require('./router.js');
const response = require('../response.js');
const fs = require('fs-extra');
const dbfile = __dirname + "/../data/notes.dat";

router.get('/api/notes',(req, res) => {

  let id = req.url && req.url.query && req.url.query.id;
  if(id){
    console.log('IF');
    fs.readJson(dbfile)
    .then(allNotes => {
      let note = allNotes[id];
      response.sendjson(res, 200, note);
    })
    .catch( err => response.sendStatus(res, 404, err) )
  }
  else {
    console.log('ELSE')
    fs.readJson(dbfile)
    .then(allNotes => {
      console.log('THEN');
      response.sendjson(res, 200, allNotes) })
    .catch( err => {

      console.log('CATCH', err);
      response.sendStatus(res, 404, err)} )
  }
});

router.post('/api/notes',(req, res) =>{
    if (!req.body) return response.sendStatus(res, 400, "bad request");
    if(!req.body.title) return response.sendStatus(res, 400, "Missing Title");
    if(!req.body.content) return response.sendStatus(res, 400, "Missing Content");

    let note = new Note(req.body);
    let data = {};

     data[note.id] = note;

    let saveNote = JSON.stringify(data);

    fs.outputFile(dbfile, note)
    .then(response.sendjson(res, 200, saveNote))
    .catch(err => response.sendStatus(res, 500, err));

});

router.put('/api/notes',(req, res) =>{
  if(!req.body.title) return response.sendStatus(res, 400, "Missing Title");
  if(!req.body.content) return response.sendStatus(res, 400, "Missing Content");
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
    if(!req.body.title) return response.sendStatus(res, 400, "Missing Title");
    if(!req.body.content) return response.sendStatus(res, 400, "Missing Content");
    for (var index = 0; index<notes.length; index++){
      if (notes[index].id === id){
        let found = true;
        notes[index].title = req.body.title;
        notes[index].content = req.body.content;
        response.sendjson(res, 200, `patched note: ${notes[index]}`);
      }
    }
    if (found===false) response.sendStatus(res, 400, 'id not found')
  }
});

router.delete('/api/notes',(req, res) => {
    let id = req.url && req.url.query && req.url.query.id;
    if(id){
      notes = notes.filter((ele) => { return ele.id !== id });
      console.log("all notes: ",notes);
          response.sendjson(res, 200, `note ${id} deleted`)
    }else{
      response.sendStatus(res, 400, 'id not found')
    }
})
