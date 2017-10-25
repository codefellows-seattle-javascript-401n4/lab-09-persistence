'use strict';

const fsextra = require('fs-extra');


const Storage = {};

Storage.path = `${__dirname}/notes.json`;

Storage.fileExists = () => {
    return new Promise((resolve) => {
        fsextra.pathExists(Storage.path).then(exists => {
            resolve(exists);
        });
    });
};

Storage.readFile = () => {
    return new Promise((resolve,reject) => {
        fsextra.readJson(Storage.path, (err, contents) => {
            if (err) reject('File does not exist');
            resolve(contents);
        });
    });
};

Storage.saveNote = (note) => {
    return new Promise(resolve => {
        Storage.fileExists().then(exists => {
            if (!exists) {
                fsextra.writeJson(Storage.path, note , err => {
                    if (err) resolve('Note could not be saved');
                    resolve('Note saved!');
                });
            } else {
                Storage.readFile().then(contents => {
                    if (typeof contents[note.id] === 'undefined') {
                        contents[note.id] = {'id': note.id, 'date': note.date, 'content': note.content};
                        fsextra.writeJson(Storage.path, contents, err => {
                            if (err) resolve('Note could not be saved');
                            resolve('Note saved!');
                        });
                    } else {
                        resolve('Note already exists');
                    }
                });
            }
        });
    });
};

Storage.deleteNote = (note) => {
    return new Promise(resolve => {
        Storage.fileExists().then(exists => {
            if (!exists) resolve('File does not exist');
            Storage.readFile().then(contents => {
                if (typeof contents[note] === 'undefined') resolve('Note does not exist to be deleted.');
                contents[note] = null;
                delete contents[note];
                fsextra.writeJson(Storage.path, contents, err => {
                    if (err) resolve('Error deleting note');
                    resolve('Note Deleted.');
                });

            });
        });
    });
};
   
module.exports = Storage;