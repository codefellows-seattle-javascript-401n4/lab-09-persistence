'use strict';

const uuid = require('uuid');
const storage = require('../lib/storage.js');

class Note  {
  constructor(content) {
    this.id = uuid.v1();
    this.dateCreated = new Date();
    this.content = content;
  }

  save() {
    return storage.setItem(this);
  }

  update() {
    return storage.updateItem(this);
  }

  delete() {
    return storage.deleteItem(this.id);
  }
}

Note.findById  = (id) => {
  return storage.fetchItem(id)
    .then(data => {
      return new Note(data.content, id);
    });
};

module.exports = Note;
