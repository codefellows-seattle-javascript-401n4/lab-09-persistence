'use strict';

module.exports = {

  display_404: (res) => {

    res.writeHead(404, { 'Content-Type': 'text/plain' } );
    res.write('Page Not Found');
    res.end();

  },

};
