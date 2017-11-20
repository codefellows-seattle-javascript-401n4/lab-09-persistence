'use strict';

const fs = require('fs-extra');

class Storage{

  constructor(db){
    this.dbFile = db;
    fs.pathExists(this.dbFile)
      .then(exists => !exists && fs.outputJson(this.dbFile, {}));
  }

  getAll(){
    return fs.readJson(this.dbFile);
  }

  getOne(id){
    return new Promise((resolve, reject) => {
      if(!id){
        reject('Need an Id');
      }

      this.getAll()
        .then(data => resolve(data[id]))
        .catch(err => reject(err));
    });
  }

  saveItem(item){
    return new Promise((resolve, reject) => {
      this.getAll()
        .then(data => {
          data[item.id] = item;
          fs.outputJson(this.dbFile, data)
            .then(() => resolve(item))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  deleteItem(id){
    return new Promise((resolve, reject) => {
      if(!id){
        reject('Need an Id');
      }

      this.getAll()
        .then(data => {
          if(data[id]){
            delete data[id];
            fs.outputJson(this.dbFile, data)
              .then(() => resolve())
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = (db) => {return new Storage(db);};
