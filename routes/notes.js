const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { noteTitle, noteDetail } = req.body;

  if (noteTitle && noteDetail) {
    const newNote = {
      title: noteTitle,
      text: noteDetail,
      id: uuid(),
    };

    console.log('NEWNOTE')
    console.log(newNote)
    readAndAppend(newNote, "./db/notes.json");
    res.json(`note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
