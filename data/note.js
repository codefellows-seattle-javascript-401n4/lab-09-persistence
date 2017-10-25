'use strict';

const uuid = require("uuid/v1");

class Note {

    constructor(content) {
      this.id = uuid();
      this.date = new Date();
      this.content = content;

    }

    // Instance (prototype) Methods
    toString() {
    }

}

module.exports = Note;
