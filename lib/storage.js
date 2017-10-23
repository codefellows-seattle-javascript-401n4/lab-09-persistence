'use strict';

//fs-extra outputJson: if the file is not there then it will create the an empty object at first and will save whatever
const fs = require('fs-extra');

class Storage {

  constructor (db) {
    this.databaseFile = db;
    fs.pathExists(this.databaseFile)
    //if does not exist then create it
      .then( exists => ! exists && fs.outputJson(this.databaseFile, {}) );
  }
  //prototype method
  getItems() {
    return fs.readJson(this.databaseFile);
  }

  getItem(id) {
    return new Promise ((resolve, reject) => {
      if( !id ) {reject('ID not provided');}
      this.getItems()
        .then( data => {
          if(data[id]) { resolve(data[id]);}
          else { reject('Invalid ID; Cannot find the item with that ID');}
        })
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
        })
        .catch(error => reject(error));
    });
  }

  deleteItem (id) {
    return new Promise ( (resolve, reject) => {

      if (!id) {reject('ID not provided');}

      this.getItems()
        .then( data => {
          if (data[id]) {
            delete data[id];
            fs.outputJson(this.databaseFile, data)
              .then( () => resolve(true) )
              .catch( error => reject(error) );
          } else {
            reject('Invalid ID; Cannot find the item with that ID');
          }
        })
        .catch( error => reject(error) );
    });
  }
}

module.exports = (db) => { return new Storage(db); };
