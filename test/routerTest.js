/* global jest, expect */

//this is a unit test, all I want to know is if a particular route function work

//1. can it register a route?
//2. when a registered route is called for, does it execute?

//Mock the parser so I can force things to happen, force failures, simulate different input/output.  I don't have to rely on the acutal parser to work
//mocking all the requests for this module, lib/parse-request, with this version of it
jest.mock('../lib/parse-request', () => {
  return {
    parse: (req) => {
      let obj = {tree: 'magnolia'};

      req.url = {
        pathname: req.path,
        query: {price:'free'},
      };

      req.body = JSON.stringify(obj);
      return Promise.resolve(req);
    },
  };
});

//Mocking res, the response object, which is a node HTTP response object.  I don't want to have my server running to test this code
let res = {
  //res.write
  write: () => {},
  //res.writeHead
  writeHead: () => {},
  //res.end
  end: () => {},
};

let writeHead = jest.spyOn(res, 'writeHead');
let router = require('../lib/router');

describe('Router', () => {
  describe('can register routes', () => {
    it('rejects requests to a non-existent valid route', () => {
      let req = {
        method:'GET',
        path: '/roses/lilies',
      };

      return router.route(req, res)
        .then( () => {
          expect(writeHead).toHaveBeenCalledWith(404);
        });
    });

    it('registers and responds to valid route', () => {
      let req = {
        method:'GET',
        path:'/price/free'
      };

      let handler = jest.fn(() => true);
      router.get('/foo/bar', handler);
      return router.route(req,res)
        .then( () => {
          expect(handler).toHaveBeenCalled();
        });
    });

    it('does not register and does not respond to a non-REST route', () => {
      let req = {
        method:'INCORRECT',
        path: '/incorrect/path',
      };

      let handler = jest.fn(() => true);

      router.get('/incorrect/path', handler);

      return router.route(req,res)
        .then(() => {
          expect(handler).not.toHaveBeenCalled();
          expect(writeHead).toHaveBeenCalledWith(400);
        });
    });

  });
});





// let req = {
//                method:'GET',
//                path: '/fizz/buzz',
//            };
//
//            return router.route(req, res)
//             .then( () => {
//                 expect(writeHead).toHaveBeenCalledWith(404);
//             });
//
//        });
