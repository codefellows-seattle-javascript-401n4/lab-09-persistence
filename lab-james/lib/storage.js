'use strict';

const fs = require('fs-extra');

class Storage {

  constructor(db){
    this.databaseFile = db;
    fs.pathExists(this.databaseFile)
      .then(exists => !exists && fs.outputJson(this.databaseFile, {}) );
  }

  getAll(){
    return fs.readJson(this.databaseFile);
  }

  getItem(id){
    return new Promise( (resolve, reject) => {
      if(!id){
        reject('ID required');
      }

      this.getAll()
        .then(data => {
          if(data[id]){
            resolve(data[id]);
          } else {
            reject('ID not found');
          }
        })
        .catch(err => {
          reject(err);
        });

    });
  }

  saveItem(item){
    return new Promise( (resolve, reject) =>{
      this.getAll()
        .then(data => {
          data[item.id] = item;
          fs.outputJson(this.databaseFile, data)
            .then( () => {
              resolve(item);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}
