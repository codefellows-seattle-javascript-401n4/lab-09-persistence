'use strict';

const uuidv4 = require('uuid/v4');


class Sushi{

  constructor(name,fish){
    this.id = uuidv4();
    this.name = name;
    this.fish = fish;
  }
}

module.exports = Sushi;
