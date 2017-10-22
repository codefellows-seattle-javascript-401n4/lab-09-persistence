'use strict';

const http = require('http');
const router = require('../lib/routes.js');
const Sushi = require('../model/sushi.js');
const response = require('../lib/response.js');
const databaseFile = __dirname + "../model/data/sushi.dat";
const storage = require('../lib/storage.js')(databaseFile);

router.post('/api/Sushi', (req,res) => {
  if(! (req.body.name && req.body.fish)){
    return response.sendStatus(res,400,'missing body');
  }
  let sushi = new Sushi(req.body.name,req.body.fish);
  storage.saveItem(sushi)
  .then( item => response.sendJSON(res,200,item))
  .catch(err =>  response.sendStatus(res,400,err));
});

router.get('/api/Sushi', (req,res) => {
  let id = req.url.path.split('=')[1];
  if(id){
    storage.getItem(id)
    .then( item => response.sendJSON(res,200,item))
    .catch( err => response.sendStatus(res,404,err));
  }
  else{
    storage.getItems()
    .then( allID => response.sendJSON(res,200, allID))
    .catch( err => response.sendStatus(res,400,err));
  }
});

router.delete('/api/Sushi', (req,res) => {
  let id = req.url.path.split('=')[1];

  if(id){
    storage.deleteItem(id)
    .then(response.sendJSON(res,204, 'ok'))
    .catch(err => response.sendStatus(res,404,err));
  }
});

const server = module.exports = http.createServer(router.route);
