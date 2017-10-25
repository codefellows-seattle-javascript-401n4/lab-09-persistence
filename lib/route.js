'use strict';

const Note = require('../data/note.js');
const router = require('../lib/router.js');
const parser = require('../lib/parse-request');
const sendMessage = require('../lib/sendMessage.js');
const Storage = require('../data/storage.js');

router.POST('/api/notes', (req,res) => {
    let string = '';

    req.on('data', (chunk) => {
        string += chunk;
    }).on('end', () => {
        string = string.toString();
        if (string.length === 0) {
            sendMessage(res, 400, 'No content found to create note.');
        } else {
            console.log('got here');
            let newNote = new Note(string['body']);
            Storage.saveNote(newNote).then(response => {
                sendMessage(res, 200, response);
            });
        }
        
    });
});
//
router.DELETE('/api/notes', (req,res) => {

    parser(req);

    if (Object.keys(req.url.query).length > 0) {
        Storage.deleteNote(req.url.query['uuid']).then(response => {

            if (response === 'Note Deleted') sendMessage(res, 200, 'Note Deleted.');
            if (response === 'Note does not exist to be deleted.') sendMessage(res, 404, 'Note not found. Please try another uuid');
            if (response === 'File does not exist') sendMessage(res, 400, 'No notes in storage. Try creating one first.');
        });
    } else {
        // nothing passed as ?parameter
        sendMessage(res, 404, 'Please send a ?uuid= parameter with your POST request');
    }
});

router.GET('/api/notes', (req,res) => {
    parser(req);

    Storage.readFile().then(response => {

        // if ?uuid= is blank or does not exist, send all notes/
        if ((Object.keys(req.url.query).length === 0) || req.url.query['uuid'] == '') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            for (var note in response) {


                res.write(JSON.stringify(response[note]));
                res.write('\r\n');
            }
        } else {
            if (typeof response[req.url.query['uuid']] === 'undefined') {
                sendMessage(res, 404, 'Note not found');
            } else {
                sendMessage(res, 200, JSON.stringify(response[req.url.query['uuid']]));
            }
        }
        res.end();
    });

});

module.exports = router;
