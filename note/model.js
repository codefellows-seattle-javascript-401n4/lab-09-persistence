'use strict';

const uuid = require('uuid/v1');
const fs = require('fs-extra');
const db = './data/notes.json';

class Note {

  constructor(opts) {
    this.id = opts.id || uuid();
    this.date = new Date();
    this.title = opts.title;
    this.contents = opts.contents;
  }

  // Instance (prototype) Methods

  deleteNote(){
    Note.allNotes[this.id] = null;
    delete Note.allNotes[this.id];
    return new Promise(function(resolve, reject) {
      fs.outputJson(db, Note.allNotes)
        .then(() => resolve(true))
        .catch(err => {
          reject(err)
        })
    });
  };

  addNote() {
    Note.allNotes[this.id] = this;
    return new Promise(function(resolve, reject) {
      fs.outputJson(db, Note.allNotes)
        .then(() => resolve(true))
        .catch(err => {
          reject(err)
        })
    });
  }
}

Note.allNotes = {};

Note.loadAll = function(){
  fs.readJson(db)
    .then(packageObj => {
      Note.allNotes = packageObj
    })
    .catch(err => {
      console.error(err)
    })
}




Note.getNote = function(id) {
  let note = false;
  if (id && Note.allNotes[id]) {
    note = Note.allNotes[id];
  }
  return note;
};

module.exports = Note;
