const mongoose = require("mongoose")
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
});

const Notes = mongoose.model("notes", NotesSchema);
Notes.createIndexes()

module.exports = Notes;