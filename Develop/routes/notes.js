const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const noteDB = {
            title: title,
            text: text,
            note_id: uuidv4(),
        };

        readAndAppend(noteDB, './db/db.json');

        const response = {
            status: 'Note Saved',
            body: noteDB,
        };
        res.json(response);
    } else {
        res.json('Error in posting');
    }
});

module.exports = notes;