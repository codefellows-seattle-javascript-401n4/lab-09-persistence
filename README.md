
*lib/_server.js*  On connection, calls the router.routes method. Starts and stops server.

*lib/response.js* Takes in a response object, status code and message, writes out the response.

 _json_ Returns a json object and status code

 _status_ Returns status code and message

*lib/router.js* Declares a routeHandler that defines all available http methods. Sets up a registry for routes, by taking in the uri and callback function for each route.  If route doesn't exist, or json data is bad, calls either the 400 or 404 error module.

*lib/store.js* Storage constructor for data. Takes in a database file.

  _getAllNotes()_  Reads db file and returns all notes on file

  _getNoteByID(id)_  Takes in a uuid(string), and returns the specific note from the db file that corresponds with the id

  _saveNote(note)_  Takes in a note object (json data) and writes it to the db file

  _deleteNote(id)_ Takes in a uuid (string), and deletes the specific note from the db file that corresponds with the id


*lib/routes/note-routes.js*

  _get('/api/notes')_  Checks for id in query and send to the getNoteByID(). If no query is provided, routes to the getAllNotes method. Finally, calls appropriate response module.

  _post('/api/notes')_ Checks for valid json data from helper module ('lib/helpers/requestParser'). If valid, sends data to saveNote() to create new note. Finally, calls appropriate response module.

  _delete('/api/notes')_ Checks for an id. If id is given, sends id to deleteNote(). Finally, calls appropriate response module (if no id, provided, status code will be 400 and log error msg).

*lib/routes/400.js*  When all else fails and route json request cannot be resolve, this func takes in response object and err, outputs the err message

*lib/routes/404.js*  Takes in response object, so when request route does not exist in api, returns error.

*/model/note.js* Note contructor: takes in json object and sets the content and title.

*note-routes.test.js* tests all the note route methods. run `npm test` from command license
