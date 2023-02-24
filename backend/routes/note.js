const express = require("express");
const router = express.Router();
const Note = require("../modal/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route: 01
// Creating a note using POST request:  '/api/note/createnote'   -: Login required
router.post(
  "/createnote",
  fetchuser,
  [
    // validation checks on creating note
    body("title", "Length of title must be atleast three character,").isLength({
      min: 1,
    }),
    body(
      "description",
      "Length of description must be atleast five character"
    ).isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request, if therer are error return bad request and errors and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = Note({ title, description, tag, user: req.user.id });
      const saveNote = await note.save();
      // console.log(saveNote);
      res.json(saveNote);
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// Route: 02
// Fetching allnotes using GET request:  '/api/note/fetchallnotes'   -: Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route: 03
// Updating a note using PUT request:  '/api/note/updatenote/:id'   -: Login required
router.put(
  "/updatenote/:id",
  fetchuser, // /updatenote/:id   --> here id is a note id
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      // Find the note whose we want to updated.
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      // note is updated
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.error(error.message);

      res.status(500).send("Internal Server Error");
    }
  }
);

// Route: 04
// Delelting a note using DELETE request:  '/api/note/deletenote/:id'   -: Login required
router.delete(
  "/deletenote/:id",
  fetchuser, // /deletenote/:id   --> here id is a note id, whose want to deleting
  async (req, res) => {
    try {
      // Find the note whose  want to delete.
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      // note is deleted
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ Success: "Note deleted", note: note });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
