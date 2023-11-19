const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes")
const fetchuser = require("../middleware/fetchuser")
const { check, validationResult } = require("express-validator");

// Route1: Post request on endpoint /createNotes & create a note for the users
router.post("/createNotes", fetchuser, [
    // Check or Validate the Json
    check('title').notEmpty().isLength({ min: 3 }).withMessage("Title should be atleast 3 characters"),
    check('author').notEmpty().withMessage("Author name is necessary"),
    check('description').isLength({ min: 5 }).withMessage("Description should be atleast 5 characters")
], async (req, res) => {
    const errors = validationResult(req);
    // If not empty means error is there
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check is same title is availabe or note
        let notes = await Notes.findOne({ title: req.body.title })
        if (notes) {
            return res.status(400).json({ error: "Note with this Title is already exist" })
        }
        // Creating a Note
        Notes.create({
            user: req.user.id,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description
        })
        res.json()
    } catch (error) {
        console.log(error.message);
        res.status(500, "Some error occured")
    }
})

// Route2: Post request on endpoint /getnotes here the login should be must, it will get the notes of the user which user have creted
router.post("/getnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})

// Route3: Post request on endpoint /getnotes here the login should be must, this will update the existing notes of the user
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, author } = req.body;
    try {
        // Created a newNote 
        const newNotes = {}
        if (title) { newNotes.title = title };
        if (author) { newNotes.author = author };
        if (description) { newNotes.description = description };

        // Finding a note to update it & then updating it,if not found show error
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404, "Note not found");
        }

        // Checking if the notes belongs to the particular user
        if (note.user.toString() !== req.user.id) {
            return res.status(402, "Un-Authorized");
        }

        //Updating the notes
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json(note)
    } catch (error) {
        console.log(error.message);
        res.status(500, "Some error occured")
    }

})

// Route4: Post request on endpoint /deletenote here the login should be must, this will delete the existing notes of the user
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Finding a note to update it & then updating it,if not found show error
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404, "Note not found");
        }

        // Checking if the notes belongs to the particular user
        if (note.user.toString() !== req.user.id) {
            return res.status(402, "Un-Authorized");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ note })
    } catch (error) {
        console.log(error.message);
        res.status(500, "Some error occured")
    }

})

module.exports = router;