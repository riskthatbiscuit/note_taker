const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
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
    res.status(200).json(`note added successfully 🚀`);
  } else {
    res.status(400).error("Error in adding note");
  }
});


// DELETE Route for notes
notes.delete('/:id', (req, res) => {
  console.log(`${req.method} request recieved to delete note`);
  
  const noteId = req.params.id;
  console.log(noteId)

  readFromFile("./db/notes.json")
    .then((data) => {
      const notesArray = JSON.parse(data);
      const noteIndex = notesArray.findIndex((note) => note.id === noteId);
      console.log(noteIndex);
      if (noteIndex !== -1) {
        notesArray.splice(noteIndex,1);
        writeToFile("./db/notes.json", notesArray)
        res.status(200).json(`Note added successfully 🚀`);
      } else {
        res.status(400).json("Note not found");
      }
    })
    .catch((err) => {
      res.status(500).json({status:"Server error"});
    })
})

module.exports = notes;
