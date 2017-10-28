'use strict';

const Note = require('../model/NoteCon.js');
const router = require('../lib/router.js');
const send = require('../lib/send.js');
const databaseFile = '../lab-james/model/data/notes.dat';
const storage = require('../lib/storage')(databaseFile);

router.storage = storage;

router.get('/api/notes', (req, res) => {
  let id = req.url.query.id;

  if(id){
    return router.storage.getItem(id)
    .then(item => send.JSON(res, 200, item))
    .catch(err => {
      send.status(res, 500, err);
    });

  } else {

    return router.storage.getAll()
      .then(allItems => send.JSON(res, 200, allItems))
      .catch(err => {
        send.status(res, 404, err);
      });
  }

});

router.post('/api/notes', (req, res) => {
  if(!req.body.content){
    send.status(res, 400, 'Missing content');
  }

  if(!req.body.name){
    return send.status(res, 400, 'Missing name');
  }

  let note = new Note(req.body);

  return router.storage.saveItem(note)
    .then(item => {
      send.JSON(res, 200, item);
    })
    .catch(err => {
      send.status(res, 500, err);
    });

});

router.put('/api/notes', (req, res) => {
  let id = req.url.query.id;

  if(!req.body.content){
    return send.status(res, 400, 'Missing content');
  }

  if(!req.body.name){
    return send.status(res, 400, 'Missing name');
  }

  return router.storage.replace(id, req.body.content, req.body.name)
    .then(item => {
      send.JSON(res, 200, item);
    })
    .catch(err => {
      send.status(res, 500, err);
    });

});

router.delete('/api/notes', (req, res) => {
  let id = req.ur.query.id;

  if(id){
    return router.storage.delete(id)
      .then(send.JSON(res, 200, 'Item deleted'))
      .catch(err => {
        send.status(res, 500, err);
      });
  }

});
