const Storage = require('./data/storage.js');
let Note = require('./data/note.js');

let storage = new Storage();

let newNote = new Note('Note contentssss');
 
storage.deleteNote(newNote).then(console.log);