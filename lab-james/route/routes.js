'use strict';

const routeHandlers = module.exports = {};

let methods = ['get', 'put', 'post', 'patch', 'delete'];

methods.forEach(method => {
  routeHandlers[method.toUpperCase()] = {};
});
