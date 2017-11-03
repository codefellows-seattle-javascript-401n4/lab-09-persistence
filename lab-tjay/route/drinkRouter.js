'use strict';

const uuid = require('uuid');
const router = require('../lib/router.js');
const Drinks = require('../model/notes.js');

router.post('/api/notes', (req, res) => {
  if (!req.body.content) return res.sendStatus(400);

  let id = uuid.v1();
  let date = new Date();
  let content = req.body.content;
  new Drinks(id, date, content)
    .save()
    .then((note) => res.sendJSON(201, note))
    .catch(() => res.sendStatus(500));
});

router.get('/api/notes', (req, res) => {
  if (!req.url.query.id) return res.sendStatus(400);

  Drinks.findById(req.url.query.id)
    .then((note) => res.sendJSON(200, note))
    .catch(() => res.sendStatus(404));
});

router.put('/api/notes', (req, res) => {
  if (!req.url.query.id) {
    return res.sendStatus(400);
  }

  let id = req.url.query.id;
  let date = req.body.creationDate;
  let content = req.body.content;
  new Drinks(id, date, content)
    .update()
    .then((note) => res.sendJSON(202, note))
    .catch(() => res.sendStatus(404));
});

router.delete('/api/notes', (req, res) => {
  if (!req.url.query.id) return res.sendStatus(400);

  Drinks.findById(req.url.query.id)
    .then((note) => note.delete()
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(500))
    )
    .catch(() => res.sendStatus(404));
});
