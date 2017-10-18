'use strict';

process.env.PORT = 4000;
const request = require('superagent');
const expect = require('expect');

describe('api/notes', function() {

  let noteID = '';

  before((done) => {
    require('../lib/_server').start();
    done();
  });
  after((done) => {
    require('../lib/_server').stop();
    done();
  });


  describe('POST /api/notes', () => {

    it('should respond with a 200', (done) => {

      request
      .post('http://localhost:4000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Note1',
        content: 'This is my first note',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Note1');
        expect(res.body.content).toEqual('This is my first note');
        noteID = res.body.id;
      });
      done();
    });

    it('should respond with a 200', () => {

      return request
      .post('http://localhost:4000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Note2',
        content: 'This is my second note',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Note2');
        expect(res.body.content).toEqual('This is my second note');
        noteID = res.body.id;
      });

    });

    it('should respond with a 400 and "Missing Title"', (done) => {

      request
      .post('http://localhost:4000/api/notes')
      .set('Content-Type;', 'application/json')
      .send({
        content: 'This is my first note',
      })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Missing Title');
      });
      done();
    });

    it('should respond with a 400 and "Missing Content"', (done) =>{

      request
      .post('http://localhost:5500/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Some Fabulous Title',
      })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Missing Content');
      });
      done();
    });

  });

  describe('GET /api/notes', () => {

    it('should return a 404 for an unregistered route', (done) => {

      request
      .get('http://localhost:4000/api/goats')
      .then(res => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual('Page Not Found');
      });
      done();

    });


    it('should return all notes if no id is specified', (done) => {

      request
      .get(`http://localhost:4000/api/notes`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).not.toBe(null);
      });
      done();
    });

    it('should return a 200 for a valid note id', (done) => {

      request
      .get(`http://localhost:4000/api/notes?=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
      done();
    });

  });

  describe('PUT /api/notes', () => {

    it('should respond with a 200 and update the note', (done) => {

      request
      .post(`http://localhost:4000/api/notes?id=${noteID}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Note11',
        content: 'This is my eleventh note',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Note11');
        expect(res.body.content).toEqual('This is my eleventh note');
      });
      done();
    });

  describe('PATCH /api/notes', () => {

    it('should respond with a 200 and update the note content only', (done) => {

      request
      .post(`http://localhost:4000/api/notes?id=${noteID}`)
      .set('Content-Type', 'application/json')
      .send({
        content: 'WOOHOO',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Note11'); //didn't change the title
        expect(res.body.content).toEqual('WOOHOO'); //changed the content
      });
      done();
    });

    it('should respond with a 200 and update the note title only', (done) => {

      request
      .post(`http://localhost:4000/api/notes?id=${noteID}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Shenanigans',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Shenanigans'); //changed the title
        expect(res.body.content).toEqual('WOOHOO'); //didn't change the content
      });
      done();
    });
  });

  describe('DELETE /api/notes', () => {

    it('should respond with a 204 and delete the specified note', (done) => {

      request
      .post(`http://localhost:4000/api/notes?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(204);
        expect(res.message).toEqual('No Content');
      });
      done();
    });
  });
  });
});
