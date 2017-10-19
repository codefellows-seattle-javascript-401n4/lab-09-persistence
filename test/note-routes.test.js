'use strict';

process.env.PORT = 4000;
const superagent = require('superagent');
const expect = require('expect');

describe('api/notes', function() {

  let noteID = '';

  beforeAll((done) => {
    require('../lib/_server').start();
    done();
  });
  afterAll((done) => {
    require('../lib/_server').stop();
    done();
  });


  describe('POST /api/notes', () => {

    test('should respond with a 200', () => {

      return superagent.post('http://localhost:4000/api/notes')
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
    });

    test('should respond with a 200', () => {

      return superagent.post('http://localhost:4000/api/notes')
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

      superagent.post('http://localhost:4000/api/notes')
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

      superagent.post('http://localhost:4000/api/notes')
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

    test('should return a 404 for an unregistered route', (done) => {

      superagent.get('http://localhost:4000/api/goats')
      .then(res => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual('Page Not Found');
      });
      done();
    });


    test('should return all notes if no id is specified', (done) => {

      superagent.get(`http://localhost:4000/api/notes`)
      .then(res => {

        let titles = [];

        res.body.forEach((note) => titles.push(note.title));

        expect(res.status).toEqual(200);
        expect(titles[0]).toEqual('Note1');
        expect(titles[1]).toEqual('Note2');
      });
      done();
    });

    test('should return a 200 for a valid note id', (done) => {

      superagent.get(`http://localhost:4000/api/notes?=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
      done();
    });

  });

  describe('DELETE /api/notes', () => {

    test('should respond with a 204 and delete the specified note', (done) => {

      superagent.post(`http://localhost:4000/api/notes?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(204);
        expect(res.message).toEqual('No Content');
      });
      done();
    });
  });

});
