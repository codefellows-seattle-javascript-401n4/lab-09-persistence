'use strict';

require('dotenv').config(); //to get environment variables for my port
require('./lib/server').start(process.env.PORT); //start my server
 
//another way to start my server
// server.start(process.env.PORT)
//   .then(console.log);
//   .catch(console.log);
//
// server.stop()
//   .then(console.log);
//   .catch(console.log);

//type the following into the terminal:
//nodemon index
//echo '{"title":"First Note", "content":"Note Text"}' | http post http://localhost:8080/api/notes
//http get http://localhost:8080/api/notes    ////list out all the notes
