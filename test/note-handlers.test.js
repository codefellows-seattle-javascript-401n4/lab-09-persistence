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

  return {
    message: (res, status, text) => {
      console.log('hello');
    },
    json: (res, status, json) => {

    },
  };

});

let handler = require('../model/noteHandlers');

describe('Note handlers', () => {
  describe('post()', () => {
    it('sends a 400 error if the title is missing', () => {
      let res = {};
      let req = {
        body: {
          content: 'Some Content',
        },
      };

      handler.post(req,res);
      expect(sender.message).toHaveBeenCalledWith(res, 400);
    });

    it('saves the notes into storage with all provided requirements', () => {
      let res = {};
      let req =  {
        body: {
          content: 'Some Content',
        },
      };
      handler.post(req,res);
      expect(sender.json).toHaveBeenCalledWith(res, 201);
    });
  });


  describe('get()', () => {
    it('', () => {

    });
  });
});
