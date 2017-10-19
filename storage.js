'use strict';

const fsextra = require('fs-extra');

module.exports = (file, data) => {
    this.filepath  = `${dirname}../data/${this.file}`,
    this.data = data;
    this.exists = fsextra.pathExists(`${filepath}`).then(exists => exists),
    this.fileContents = () => {
        return (this.exists) ? fsextra.readJson(this.filepath).then(contents => contents) : {};
    },
    this.addNote = () => {
        fsextra.writeJson(this.filepath, Object.assign({}, this.fileContents, this.data)).then('New File Saved').catch('File could not be saved');
    },
    this.deleteNote = () => {
        if (this.fileContents[data['id']]) {
            this.fileContents[data['id']] = null;
            delete this.fileContents[data['id']]
            fsextra.writeJson(this.filepath, Object.assign({}, this.fileContents, this.data)).then('File Deleted!').catch('File could not be deleted');
        } else {
            return 'Note did not exist for us to delete';
        }
    }
}