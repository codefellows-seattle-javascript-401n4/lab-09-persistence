'use strict';

let fs = require('fs-extra');

let storage = module.exports = {};

storage.setItem = (data) => {
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
    .then(() => data);
};

storage.fetchItem = (id) => {
  return fs.readJson(`${__dirname}/../data/${id}`)
    .then((data) => data)
    .catch(() => {
      return Promise.reject(new Error('404 Not Found'));
    });
};

storage.updateItem = (data) => {
  if(data.id && data.creationDate && data.content){
    return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
      .then(() => data)
      .catch((err) => {
        return err;
      });
  }
  return Promise.reject(new Error('Data must have content and a creationDate'));
};

storage.deleteItem = (id) => {
  return fs.remove(`${__dirname}/../data/${id}`)
    .then((data) => data)
    .catch((err) => {
      return err;
    });
};
