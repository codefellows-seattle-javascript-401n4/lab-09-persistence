'use strict';

const bodyParse = require('./bodyParse.js');
const responseHelpers = require('./responseHelper.js');

const routes = {
  GET: {},
  PUT: {},
  POST: {},
  DELETE: {},
};

const router = module.exports = {};

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

router.path = (req, res) => {
  responseHelpers(res);
  bodyParse(req, (err) => {
    if (err) {
      res.writeHead(400);
      res.end();
      return;
    }

    let routeHandler = routes[req.method][req.url.pathname];

    if (routeHandler) {
      routeHandler(req, res);
    } else {
      res.writeHead(404);
      res.end();
      return;
    }
  });
};
