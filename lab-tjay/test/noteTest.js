'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Note = require('../model/notes.js');
let tempNote;

before((done) => {
  server.listen(4000, () => done());
});
after((done) => {
  server.close(() => done());
});

  
describe('testing POST /api/notes', () => {

  it('should respond with a note', (done) => {
    superagent.post('localhost:4000/api/notes')
      .send({content: 'example data'})
      .end((err, res) => {
        if (err) return done(err);
        tempNote = res.body;
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.content).toEqual(tempNote.content);
        done();
    });
  });

  it('should respond with a 400 bad request', (done) => {
    superagent.post('localhost:4000/api/notes')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
    });
  });
});

describe('testing GET /api/notes', () => {

  tempNote = new Note;

  it('should respond with a note', (done) => {
    superagent.get(`localhost:4000/api/notes?id=${tempNote.id}`)
      .end((err, res) => {
        if (err) return done(err);
          tempNote = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(tempNote.id);
          expect(res.body.content).toEqual(tempNote.content);
          done();
        });
    });

  it('should respond with a 400 bad request', (done) => {
    superagent.get('localhost:4000/api/notes')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
  });

  it('should respond with a 404 not found', (done) => {
    superagent.get('localhost:4000/api/notes/?id=593997f0-56dc-11e7-901e-41dc2888b669')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
    });
  });
});

describe('testing PUT /api/notes', () => {

  tempNote = new Note;

  it('should respond with a 400 bad request', (done) => {
    superagent.put('localhost:4000/api/notes')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
  });

  it('should respond with a 202', (done) => {
    superagent.put(`localhost:4000/api/notes?id=${tempNote.id}`)
      .send({content: 'example data'})
      .end((err, res) => {
        // tempNote = res.body;
        expect(res.status).toEqual(202);
        done();
    });
  });
});

describe('testing DELETE /api/notes', () => {

  tempNote = new Note;

  it('should respond with a 404 not found', (done) => {
    superagent.delete('localhost:4000/api/notes?id=123456')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
      
  it('should respond with a 204', (done) => {
    superagent.delete(`localhost:4000/api/notes?id=${tempNote.id}`)
      .send({})
      .end((err, res) => {
        tempNote = res.body;
        expect(res.status).toEqual(204);
        done();
      });
    });
  });
});


describe('testing for a valid route', () => {
  it('should return 404', (done) => {
    superagent.get('localhost:4000/api/notes?id=safsadfsafdsaf')
      .end((err, res) => {
          tempNote = res.body;
          expect(res.status).toEqual(404);
          done();
        });
    });
});
