const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');

//get data from db.json
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//post new note to db.json
notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const noteDB = {
            title: title,
            text: text,
            id: uuidv4(),
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

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readAndDelete(noteId, './db/db.json');
    res.json(`Note ${noteId} has been deleted`)
});



module.exports = notes;