'use strict';

const Note = require('../model/note');
const router = require('../lib/router');
const sender = require('../lib/send');

const databaseFile = __dirname + '/../model/data.notes.dat';

//telling storage to fire up and use databaseFile as database
//identifying the database that I want to pull from, which is databaseFile
const storage = require('../lib/storage')(databaseFile);

const handlers = module.exports = {};

handlers.post = (req,res) => {

  if(! req.body.title) {
    return sender.message(res, 400, 'Missing Title');
  }
  if(! req.body.content) {
    return sender.message(res, 400, 'Missing Content');
  }

  let note = new Note(req.body);

  storage.saveItem(note)
    .then(item => sender.json(res, 201, item))
    .catch(error => sender.message(res, 500, error));
};

handlers.get = (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if(id) {
    storage.getItem(id)
      .then(item => sender.json(res, 200, item))
      .catch(error => sender.message(res, 500, error));
  } else {
    storage.getItems()
      .then(allNotes => sender.json(res, 200, allNotes))
      .catch(error => sender.message(res, 404, error));
  }
};

handlers.delete = (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if(id){
    storage.deleteItem(id)
      .then(sender.json(res, 200, 'Successfully Deleted'))
      .catch(error => sender.message(res, 500, error));
  }
};
