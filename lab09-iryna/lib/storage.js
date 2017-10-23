'use strict';

const fs = require('fs-extra');

class Storage{

    constructor (db){
        this.dbfile = db;
        fs.pathExists(this.dbfile)
        .then( exists => ! exists && fs.outputJson(this.dbfile, {}) );
    }

    getItems(){
        return fs.readJson(this.dbfile);
    }

    getItem(id){
        return new Promise( (resolve, reject) => {
          if( !id ) { reject("No ID Provided"); }
          this.getItems()
          .then( data => resolve(data[id]) )
          .catch( err => reject(err) );
      });
    }

    saveItem(item){
        return new Promise( (resolve,reject) => {
          this.getItems()
          .then( data => {
          data[item.id] = item;
          fs.outputJson(this.dbfile, data)
          .then( () => resolve(item) )
          .catch( err => reject(err) );
          })
         .catch( err => reject(err) );
      });
    }

    deleteItem(id){
        return new Promise( (resolve, reject) => {
            if( !id ) { reject("No ID Provided"); }
            this.getItems()
            .then( data => {
            if( data[id] ) {
            delete data[id];
            fs.outputJson(this.dbfile, data)
            .then( () => resolve() )
            .catch( err => reject(err) );
             }
            })
            .catch( err => reject(err) );
      });
    }
}

module.exports = (db) => { return new Storage(db); };
