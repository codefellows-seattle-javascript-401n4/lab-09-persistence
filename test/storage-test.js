'use strict';

const Storage = require('../data/storage.js');
const expect = require('expect');
const Note = require('../data/note.js');

const fsextra = require('fs-extra');
require('dotenv').config();

describe('Storage Functions', () => {
    let newNote = new Note('test note contents');

    //file existance
    it('Check if file exists and return true if it does', (done) => {
        Storage.fileExists().then(response => {
            expect(response).toEqual(true);
            done();
        });
    });

    // saving note
    it('Save a new note to notes.json', (done) => {
        Storage.saveNote(newNote).then(response => {
            expect(response).toEqual('Note saved!');
            done();
        });
    });
    it('Reply that note exists if trying re-save same note', (done) => {
        Storage.saveNote(newNote).then(response => {
            expect(response).toEqual('Note already exists');
            done();
        });
    });

    // delete note
    it('Delete note by id', (done) => {
        Storage.deleteNote(newNote).then(response => {
            expect(response).toEqual('Note Deleted.');
            done();
        });
    });
    it('Does not delete note if does not exist', (done) => {
        Storage.deleteNote(newNote).then(response => {
            expect(response).toEqual('Note does not exist to be deleted.');
            done();
        });
    });

});

