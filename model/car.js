'use strict';

const uuid = require('uuid/v1');

class Car{

  constructor(config){
    this.id = uuid();
    this.createdOn = new Date();
    this.make = config.make || '';
    this.model = config.model || '';

  }
}

module.exports = Car;
