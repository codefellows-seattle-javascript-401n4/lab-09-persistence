'use strict';

module.exports = {

  display_400: (res, err) => {

    console.log(`Error: ${err}`);
    res.writeHead(400, { 'Content-Type': 'text/plain' } );
    res.write('Bad Request');
    res.end();

  },

};
