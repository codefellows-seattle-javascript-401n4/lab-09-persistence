'use strict';

const Storage = require('../data/storage.js');
const expect = require('expect');
const Note = require('../data/note.js');

const fsextra = require('fs-extra');
require('dotenv').config();

describe('Testing Storage Functions', () => {
    let newNote = new Note('test note contents');

    //file existance testing
    it('Should check whether file exists, and return true because it does', (done) => {
        Storage.fileExists().then(response => {
            expect(response).toEqual(true);
            done();
        });
    });

    // saving note testing
    it('Should save a new note to notes.json', (done) => {
        Storage.saveNote(newNote).then(response => {
            expect(response).toEqual('Note saved!');
            done();
        });
    });
    it('Should reply that note exists if we try to re-save the same note', (done) => {
        Storage.saveNote(newNote).then(response => {
            expect(response).toEqual('Note already exists');
            done();
        });
    });

    // delete note testing
    it('should delete note by given id', (done) => {
        Storage.deleteNote(newNote).then(response => {
            expect(response).toEqual('Note Deleted.');
            done();
        });
    });
    it('Should not delete note if it does not exist', (done) => {
        Storage.deleteNote(newNote).then(response => {
            expect(response).toEqual('Note does not exist to be deleted.');
            done();
        });
    });

});

