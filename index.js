const express = require("express");
const app = express();
const cors = require("cors");
const uuid = require("uuid");

app.use(express.json());
app.use(cors());

const notesList = [];

app.get("/getNotes", (req, res) => {
  res.send(notesList.reverse());
});

app.get("/addNote", (req, res) => {
  const note = {
    id: uuid.v4(),
    title: "Title",
    content: "Type Something..",
    date: new Date().toLocaleDateString(),
  };
  notesList.push(note);
  res.send(notesList.reverse());
});

app.patch("/updateNote", (req, res) => {
  const id = req.body.id;
  let note = notesList.splice(
    notesList.findIndex((note) => note.id === id),
    1
  );
  note = note[0];
  note.title = req.body.title;
  note.content = req.body.content;
  note.date = new Date().toLocaleDateString();
  notesList.push(note);
  res.send("Note updated Successfully");
});

app.delete("/deleteNote", (req, res) => {
  const id = req.body.id;
  notesList.splice(
    notesList.findIndex((note) => note.id === id),
    1
  );
  res.send("Note deleted Successfully");
});

//start the server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
