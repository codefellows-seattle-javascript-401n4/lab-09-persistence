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
          data[item.uuid] = item;
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

  deleteItem(id){
    return new Promise( (resolve, reject) =>{
      if(!id){
        reject('ID required');
      }

      this.getAll()
        .then(data => {
          if(data[id]){
            delete data[id];
            fs.outputJson(this.databaseFile, data)
              .then( () => {
                resolve('Item deleted');
              })
              .catch(err => {
                reject(err);
              });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  replaceItem(id, newContent, newName){
    return new Promise( (resolve, reject) => {
      if(!id){
        reject('ID required');
      }

      this.getAll()
        .then(data => {

          if(data[id]){
            data[id].content = newContent;
            data[id].name = newName;
            fs.outputJSON(this.databaseFile, data)
              .then( () => {
                resolve(data[id]);
              })
              .catch(err => {
                reject(err);
              });

          } else {

            reject('ID not found');

          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}

module.exports = (db) => {
  return new Storage(db);
};
