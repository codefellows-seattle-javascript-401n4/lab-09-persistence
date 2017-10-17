'use strict';

const Note = require('../model/note.js');
const router = require('../lib/router.js');

let notes =  []; //save note to a stack...this could be an array

//router can handle post of api notes...the endpoint is api/notes
router.post('/api/notes', (req, res) => {

  //if no title/content then 400
  if ((req.body.title === '') || (req.body.title === undefined)) {
    sendResponse(res, 400, `{'error: 'invalid request: missing the title'}`);
  } else if ((req.body.content === '') || (req.body.content === undefined)) {
    sendResponse(res, 400, `{'error: 'invalid request: missing the content'}`);
  } else ( (req.body.title)) {
    //save the note to the stack
    //send 200
  notes.push(new Note(req.body.title, req.body.date, req.body.content));

  sendResponse(res, 200, `{'content':'${notes}'}`)
  }
});

//router can handle delete of api notes
router.delete('/api/notes', (req, res) => {
  if(req.body.id === uuid){
    let currentIndex = notes.indexOf(uuid);
    let updatedNotes = notes.splice(currentIndex, 1);
    sendResponse(res, 200, `{'content':'${updatedNotes}'}`);
  //do I have an id?
  //is it valid?
  //nuke it
  //send 200 if all is well
  }
});

//put  = replace
router.put('/api/notes', (req, res) => {
  return new Promise ( (resolve, reject) => {

    if(req.body.id === uuid) {
      let currentIndex = notes.indexOf(uuid);
      let updatedNotes = notes.splice(currentIndex, 1);
      sendResponse(res, 200, `{'content':'${updatedNotes}'}`);
      resolve(req.body.id);

    } else if ((req.body.id === '') || (req.body.id === undefined)) {

      reject(req.body.id);
    }
  });
  //resolve and reject
  //do I have an id?
  //is it valid?
  //replace it
  //send 200 if all is well
});

router.patch('api/notes', (req, res) => {
  //do I have an id?
  //is it valid?
  //update it
  //send 200 if all is well
});

//get has get one and get all
router.get('/api/notes', (req, res) => {
  //if we have an id
      //try and pull it from the stack
          //send it
      //404 not found or 400 invalid query?
  //list all
});
