'use strict';
const uuid = require('uuid/v1');
class Note {
  constructor(config){
     //id
      this.id = uuid();
      //title
      this.title = config.title || "";
      //date
      this.createdOn = new Date();
      //content
      this.content = config.content || "";
  }
  toString(){
    return `${this.title}\n${this.content}`
  }
}
module.exports = Note;
