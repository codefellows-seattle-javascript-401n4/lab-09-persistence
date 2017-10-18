'use strict';

const uuid = require('uuid/v1');

class Note {

  constructor(data) {

    this.id = uuid();
    this.title = data.title,
    this.content = data.content;
    this.date = Date.now();

  }

  toString() { return `${this.title}\n${this.content}`; }

}

module.exports = Note;
