/* global jest, expect */

//Mock storage
let storage = jest.mock('../lib/storage', () => {

  return {
    constructor: (db) => {

    },

    getItems: () => {

    },

    saveItem: (item) => {

    },

    deleteItem: (id) => {

    }
  };
});

//Mock sender

let sender = jest.mock('../lib/send', () => {

});
