'use strict';
const Note = require('../note.js');
const router = require('./router.js');
const response = require('../response.js');
const fs = require('fs-extra');
const dbfile = __dirname + "/../data/notes.dat";
const storage = require("../storage")(dbfile);

router.get('/api/notes',(req, res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if(id){
    storage.getItem(id)
    .then(item => response.sendjson(res, 200, item))
    .catch(err => response.sendStatus(res, 500, err))
  }
  else {
    storage.getItems()
    .then(allNotes => { response.sendjson(res, 200, allNotes) })
    .catch( err => { response.sendStatus(res, 404, err) })
  };
});

router.post('/api/notes',(req, res) =>{
    if (!req.body) return response.sendStatus(res, 400, "bad request");
    if(!req.body.title) return response.sendStatus(res, 400, "Missing Title");
    if(!req.body.content) return response.sendStatus(res, 400, "Missing Content");

    let note = new Note(req.body);


    storage.saveItem(note)
    .then(item => response.sendjson(res, 200, item))
    .catch(err => response.sendStatus(res, 500, err));

});

// router.put('/api/notes',(req, res) =>{
//   if(!req.body.title) return response.sendStatus(res, 400, "Missing Title");
//   if(!req.body.content) return response.sendStatus(res, 400, "Missing Content");
//    let id = req.url && req.url.query && req.url.query.id;
//   if(id){
//     let index = notes.indexOf(notes.id);
//     notes.splice(index, 1);
//     let notePut = new Note(req.body);
//     notes.push(notePut);
//     console.log("all notes:",notes);
//     response.sendjson(res, 200, notes)
//   }
// });

// router.patch('/api/notes',(req, res) => {
//   let found = false;
//   let id = req.url && req.url.query && req.url.query.id;
//   if(id){
//     if(!req.body.title) return response.sendStatus(res, 400, "Missing Title");
//     if(!req.body.content) return response.sendStatus(res, 400, "Missing Content");
//     for (var index = 0; index<notes.length; index++){
//       if (notes[index].id === id){
//         let found = true;
//         notes[index].title = req.body.title;
//         notes[index].content = req.body.content;
//         response.sendjson(res, 200, `patched note: ${notes[index]}`);
//       }
//     }
//     if (found===false) response.sendStatus(res, 400, 'id not found')
//   }
// });

router.delete('/api/notes',(req, res) => {
    let id = req.url && req.url.query && req.url.query.id;
    if(id){
      fs.readJson(dbfile)
      .then(allNotes => {
        delete allNotes[id];
        let saveNote = JSON.stringify(allNotes);
        fs.outputFile(dbfile, saveNote)
        .then(response.sendjson(res, 200, saveNote))
        .catch(err => response.sendStatus(res, 500, err))
      })
    } else {
      response.sendStatus(res, 400, 'id not found')
    }
})
