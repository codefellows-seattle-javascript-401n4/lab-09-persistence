'use strict';


const GET = {};

const router = module.exports = {};

router.get = (pathname,callback) => {
  GET[pathname] = callback;
};


router.get('/api/Sushi', (req,res) => {
  let id = req.url && req.url.query && req.url.query.id;

  if(!id){
    
  }
})
