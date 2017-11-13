'use strict';

const uuid = require("uuid/v1");

class Note {

    constructor(content) {
      this.id = uuid();
      this.date = new Date();
      this.content = content;

    }

    toString() {
    }

}

module.exports = Note;