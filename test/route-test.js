'use strict';

const expect = require('expect');
const mocha = require('mocha');
const superagent = require('superagent');
const route = require('../route/route.js');
const server = require('../route/route.js');

let storeID;
describe('post test', () => {
  it('should return 400 for a bad request with an invalid body', () => {
    return superagent.post('http://localhost:3000/api/Sushi')
    .set("Content-Type", "application/json")
    .send({
      name: "california roll",
    })
    .catch(res => {
      expect(res.status).toEqual(400);
    });
  });
  it('should return 400 for missing body', () => {
    return superagent.post('http://localhost:3000/api/Sushi')
    .set("Content-Type", "application/json")
    .send({

    })
    .catch(res => {
      expect(res.status).toEqual(400);
    });
  });
  it('should return a 200 for a valid request with a body', () => {
    return superagent.post('http://localhost:3000/api/Sushi')
    .set("Content-Type", "application/json")
    .send({
      name: 'california roll',
      fish: 'crab',
    })
    .then( res => {
      expect(res.status).toEqual(200);
      expect(res.body.name).toBe('california roll');
      expect(res.body.fish).toBe('crab');
      storeID = JSON.parse(res.text).id;
    })
    .catch(console.log('pizza'));
  });
});

describe('get test', () => {
  it('should return a 404 for invalid id', () => {
    return superagent.get('http://localhost:3000/api/Sushi?id=777')
    .set("Content-Type", "application/json")
    .send({
      name: 'california roll',
      fish: 'crab',
    })
    .catch( res => {
      expect(res.status).toEqual(404);
    });
  });
  it('should return a 400 for no id', () => {
    return superagent.get('http://localhost:3000/api/Sushi')
    .set("Content-Type", "application/json")
    .send({
      name: 'california roll',
      fish: 'crab',
    })
    .catch( res => {
      expect(res.status).toEqual(400);
    });
  });
  it('should return a 200 for a body with a valid id', () => {
    return superagent.get(`http://localhost:3000/api/Sushi?id=${storeID}`)
    .set("Content-Type", "application/json")
    .send({
      name: 'california roll',
      fish: 'crab',
    })
    .then( res => {
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(`${storeID}`);
      expect(res.body.name).toBe('california roll');
      expect(res.body.fish).toBe('crab');
    });
  });
});

describe('delete test', () => {
  it('should return a 404 for no id or invalid id', () => {
    return superagent.delete('http://localhost:3000/api/Sushi?=888')
    .set("Content-Type", "application/json")
    .send({
      name: 'california roll',
      fish: 'crab',
    })
    .catch( res => {
      expect(res.status).toEqual(404);
    });
  });
  it('should return a 204 and ok for a deleted valid id', () => {
    return superagent.delete(`http://localhost:3000/api/Sushi?=${storeID}`)
    .set("Content-Type", "application/json")
    .send({
      name: 'california roll',
      fish: 'crab',
    })
    .then( res => {
      expect(res.body.id).toBe();
      expect(res.status).toEqual(204);
    });
  });
});
