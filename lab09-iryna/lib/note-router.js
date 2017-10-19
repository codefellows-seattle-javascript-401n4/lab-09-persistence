'use strict';
const Note = require('./note.js');
const router = require('./router.js');

let notes = [];

let sendStatus = (res, status) => {
  res.writeHead(status);
  res.end();
}

let sendJSON = (res, status, data) => {
  res.writeHead(status, {"Content-Type":"application/json"});
  res.end(JSON.stringify(data));
}

router.get('/api/notes',(req, res) => {
  let id = req.url && req.url.query && req.url.query.id;
  if(id){
    let note = notes.filter((note) => note.id === id);
    if (note) sendJSON(res, 200, note)
    else sendStatus(res, 404, "invalid id")
  }
  else{
    let allNotes = {notes:notes};
    sendJSON(res, 200, allNotes)
  }
});

router.post('/api/notes',(req, res) =>{
    if (!req.body) return sendStatus(res, 400, "bad request");
    if(!req.body.title) return sendStatus(res, 400, "Missing Title");
    if(!req.body.content) return sendStatus(res, 400, "Missing Content");
    let note = new Note(req.body);
    notes.push(note);
    console.log("all notes: ",notes);
    sendJSON(res, 200, note)
});

router.put('/api/notes',(req, res) =>{
  if(!req.body.title) return sendStatus(res, 400, "Missing Title");
  if(!req.body.content) return sendStatus(res, 400, "Missing Content");
  let id = req.url && req.url.query && req.url.query.id;
  if(id){
    let index = notes.indexOf(notes.id);
    notes.splice(index, 1);
    let notePut = new Note(req.body);
    notes.push(notePut);
    console.log("all notes:",notes);
    sendJSON(res, 200, notes)
  }
});

router.patch('/api/notes',(req, res) => {
  let id = req.url && req.url.query && req.url.query.id;
  if(id){
    for (var index = 0; index<notes.length; index++){
      if (notes[index].id = id){
        notes[index].title = req.body.title;
        notes[index].content = req.body.content;
        sendJSON(res, 200, `patched note: ${notes[index]}`);
      }
    }
  }
  else sendStatus(res, 400, 'id not found')
});

router.delete('/api/notes',(req, res) => {
    let id = req.url && req.url.query && req.url.query.id;
    if(id){
      notes = notes.filter((ele) => { return ele.id !== id });
      console.log("all notes: ",notes);
          sendJSON(res, 200, `note ${id} deleted`)
    }else{
      sendStatus(res, 400, 'id not found')
    }
})
