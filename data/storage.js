'use strict';

const fsextra = require('fs-extra');

// module.exports = {
//     exists:  fsextra.pathExists(`./notes.json`).then(exists => exists),
//     // this.fileContents = () => {
//     //     return (this.exists) ? fsextra.readJson(`${this.filepath}`).then(contents => contents) : {};
//     // },
//     // this.addNote = () => {
//     //     fsextra.writeJson(`${this.filepath}`, Object.assign({}, this.fileContents, this.data)).then('New File Saved').catch('File could not be saved');
//     // },
//     // this.deleteNote = () => {
//     //     if (this.fileContents[data['id']]) {
//     //         this.fileContents[data['id']] = null;
//     //         delete this.fileContents[data['id']]
//     //         fsextra.writeJson(`${this.filepath}`, Object.assign({}, this.fileContents, this.data)).then('File Deleted!').catch('File could not be deleted');
//     //     } else {
//     //         return 'Note did not exist for us to delete';
//     //     }
//     // }
// }

function storage(data) {
    this.data = data,
    this.path = `${__dirname}/notes.json`,
    this.fileExists = () => {
        return new Promise((resolve) => {
            fsextra.pathExists(this.path).then(exists => {
                resolve(exists);
            });
        });
    },
    this.readFile = () => {
        return new Promise((resolve,reject) => {
            fsextra.readJson(`${this.path}`, (err, contents) => {
                if (err) reject('File does not exist');
                resolve(contents);
            });
        });
    },
    this.saveNote = (note) => {
        return new Promise(resolve => {
            this.fileExists().then(exists => {
                if (!exists) {
                    fsextra.writeJson(`${this.path}`, note , err => {
                        if (err) resolve('Note could not be saved');
                        resolve('Note saved!');
                    });
                } else {
                    this.readFile().then(contents => {
                        if (typeof contents[note.id] === 'undefined') {
                            contents[note.id] = {"id": note.id, "date": note.date, "content": note.content};
                            fsextra.writeJson(`${this.path}`, contents, err => {
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
    },
    this.deleteNote = (note) => {
        return new Promise(resolve => {
            this.fileExists().then(exists => {
                if (!exists) resolve('File does not exist');
                this.readFile().then(contents => {
                    if (typeof contents[note.id] === 'undefined') resolve('Note does not exist to be deleted');
                    contents[note.id] = null;
                    delete contents[note.id];
                    fsextra.writeJson(`${this.path}`, contents, err => {
                        resolve('Error deleting note');
                    });

                });
            });
        });
    };




    // this.deleteNote = (uuid) => {
    //     return new Promise(resolve => {
    //         this.fileExists().then(exists => {
    //             if (!exists) resolve('The file did not exist for us to delete a note');

    //         });
    //     });
    // };
    
    // check if file exists
    // if file exists, does it have content? If not, return empty object
    // Save new data plus file contents on creation
    // Try to delete note from content and re-save

}

module.exports = storage;