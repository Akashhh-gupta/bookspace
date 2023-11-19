import React from 'react'
import { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/notes/getnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.log(error)
    }
  }



  // Adding a note
  const addnote = async (title, author, description) => {
    try {
      const response = await fetch(`${host}/notes/createNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, author, description }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.log(error);
      getNotes();
    }
  }

  // Deleting a note
  const deletenote = async (id) => {
    try {
      const response = await fetch(`${host}/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json)
      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes);
    } catch (error) {
      console.log(error)
    }
  }

  // Editing a note
  const editnote = async (id, title, author, description) => {
    try {
      const response = await fetch(`${host}/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ id, title, author, description }), // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      console.log(id, title, author, description);

      let newNote = JSON.parse(JSON.stringify(notes));
      //Editing logic
      for (let i = 0; i < newNote.length; i++) {
        const element = newNote[i];
        if (element._id === id) {
          newNote[i].author = author;
          newNote[i].title = title;
          newNote[i].description = description;
          break;
        }
      }
      setNotes(newNote);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <noteContext.Provider value={{ notes, getNotes, addnote, deletenote, editnote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
