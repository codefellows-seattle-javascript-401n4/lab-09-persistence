'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('api/notes', function(){

  beforeAll(server.start);
  afterAll(server.stop);

  describe('Invalid route', function(){

    test('should respond with a 404', function(){
      return superagent.get('http://localhost:3000/api/wrong')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('POST',function(){

    test('should respond with a 200', function(){
      return superagent.post('http://localhost:3000/api/notes')
        .set('content-type', 'application/json')
        .send({
          name: 'note test 1',
          content: 'content',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('note test 1');
          expect(res.body.content).toEqual('content');
        });
    });

    test('should respond with a 400 when no name sent', function(){
      return superagent.post('http://localhost:3000/api/notes')
        .set('content-type', 'application/json')
        .send({
          content: 'content',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 when no content sent', function(){
      return superagent.post('http://localhost:3000/api/notes')
        .set('content-type', 'application/json')
        .send({
          name: 'test note 2',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

  });

  describe('GET', function(){

    test('should respond with 200', function(){
      return superagent.get('http://localhost:3000/api/notes')
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('should respond with 404 when id not found', function(){
      return superagent.get('http://localhost:3000/api/notes?id=5')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

});
