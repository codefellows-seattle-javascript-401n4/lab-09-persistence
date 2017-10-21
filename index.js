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
//http get http://localhost:8080/api/notes
/////////list out all the notes
//echo '{"title":"First Note", "content":"Note Text"}' | http post http://localhost:8080/api/notes

//////to find a specifc note by its id, then copy the id number from the terminal, for example id = b98b8000-b622-11e7-bcc7-9991b0181177
//http get http://localhost:8080/api/notes?id=b98b8000-b622-11e7-bcc7-9991b0181177
