/* global jest, expect */

//mock with the 'fs' module so that we don't do anything real/routeHandlers
let fs = require('fs-extra');

let mockPathExists = (file) => {
  if (file) {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
};

let mockReadJson = (file) => {
  let json = {
    foo:'bar',
  };
  if (file) {
    return Promise.resolve(json);
  } else {
    return Promise.reject();
  }
};

let mockOutputJson = (file, json) => {
  if (file && json) {return Promise.resolve(true);}
  else {return Promise.reject();}
};

jest.spyOn(fs, 'outputJson').mockImplementation(mockOutputJson);
jest.spyOn(fs, 'readJson').mockImplementation(mockReadJson);
jest.spyOn(fs, 'pathExists').mockImplementation(mockPathExists);

const storage = require('../lib/storage')('foo');

describe('storage module', () => {
  describe('saveItem()', () => {

    it('returns the created item when a valid item is saved', () => {
      let thing = {
        id: 1,
        name: 'house',
        size: 'large',
      };

      return storage.saveItem(thing)
        .then( (res) => {
          expect(res).toEqual(thing);
        })
        .catch();
    });

    it('rejects when we try to create an invalid item', () => {
      return storage.saveItem()
        .then( (res) => {
          expect(res).toBeFalsy();
        })
        .catch( (error) => {
          expect(error).toBeTruthy();
        });
    });

  });
});
