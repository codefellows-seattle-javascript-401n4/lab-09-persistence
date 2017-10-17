'use strict';

const uuid = require('uuid/v1');

//note model
class Note {
  constructor(title, date, content) {
    this.id = uuid(); //uuid is a global scope...this is why I don't need to pass in the parameter inside the constructor like 'title', 'date', 'content'
    this.title = title;
    this.date = date;
    this.content = content;
  }

  //instance (prototype) methods
  toString() {
    let stringifiedNote = `title: ${this.title.toString()}\n, date: ${this.date.toString()}\n content: ${this.content.toString()}`;

    return stringifiedNote;
  }
}

module.exports = Note;


//old way:
// var Account = function(name){
//   this.name = name;
// }

//  Account.prototype.toString = function() {}

//new way:
// class Note {
//   constructor(name) {
//     this.name = name;
//   }
//
//   //instance (prototype) methods
//   toString() {
//
//   }
// }
