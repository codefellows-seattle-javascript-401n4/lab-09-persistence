'use strict';

const fs = require('fs-extra');

class Storage {
  constructor (db) {
    this.databaseFile = db;
    fs.pathExists(this.databaseFile)
      .then( exists => ! exists && fs.outputJson(this.databaseFile, {}) );
  }

  getItems() {
    return fs.readJson(this.databaseFile);
  }

  getItem(id) {
    return new Promise ((resolve, reject) => {
      if( !id ) {reject('ID not provided');}
      this.getItems()
        .then( data => resolve(data[id]) )
        .catch( error => reject(error) );
    });
  }

  saveItem(item) {
    return new Promise( (resolve, reject) => {
      this.getItems()
        .then( data => {
          data[item.id] = item;
          fs.outputJson(this.databaseFile, data)
            .then( () => resolve(item) )
            .catch( error => reject(error) );
        });
    });
  }

  deleteItem (id) {
    return new Promise ( (resolve, reject) => {
      if (!id) {
        reject('ID not provided');
      }

      this.getItems()
        .then( data => {
          if (data[id]) {
            delete data[id];
            fs.outputJson(this.databaseFile, data)
              .then( () => resolve() )
              .catch( error => reject(error) );
          }
        })
        .catch( error => reject(error) );
    });
  }
}

module.exports = (db) => { return new Storage(db); };
