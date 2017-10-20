/*global beforeAll,afterAll,expect*/
'use strict';

process.env.PORT = 5500;
const server = require('../lib/server');
const superagent = require('superagent');

describe('api/cars', function() {

  beforeAll(server.start);
  afterAll(server.stop);

  describe('POST /api/cars', () => {

    test('should respond with a 200', () =>{
      return superagent.post('http://localhost:5500/api/cars')
      .set('Content-Type', 'application/json')
      .send({
        make:'this is the make',
        model: 'this is the model',
      })
      .then(res=>{
        expect(res.status).toEqual(201);
        expect(res.body.make).toEqual('this is the make');
        expect(res.body.model).toEqual('this is the model');
      });
    });

    test('should respond with a 400 if I dont send make', () =>{
      return superagent.post('http://localhost:5500/api/cars')
      .set('Content-Type', 'application/json')
      .send({
        model: 'this is the model without the make',
      })
      .then(Promise.reject)
      .catch(res=>{
        expect(res.status).toEqual(400);
      });
    });

    test('should respond with a 400 if I dont send model', () =>{
      return superagent.post('http://localhost:5500/api/cars')
      .set('Content-Type', 'application/json')
      .send({
        make: 'this is make without a model',
      })
      .then(Promise.reject)
      .catch(res=>{
        expect(res.status).toEqual(400);
      });
    });

  });

});
