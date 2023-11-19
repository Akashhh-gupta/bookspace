import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


function Notes() {

    const navigate = useNavigate();

    // Using Context
    const context = useContext(noteContext);
    const { notes, getNotes, editnote } = context;


    // For the Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Ref to use modal
    const ref = useRef(null);

    const [note, setnote] = useState({ id: "", e_title: "", e_author: "", e_description: "" });

    // Displaying the notes
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    // Updating the note
    const updateNote = (cnote) => {
        ref.current.click();
        setnote({ id: cnote._id, e_title: cnote.title, e_author: cnote.author, e_description: cnote.description });
    }

    const handleUpdate = () => {
        console.log("Updating:", note);
        editnote(note.id, note.e_title, note.e_author, note.e_description);
        handleClose();
    }


    // Onchange function lets you or write in the textbox
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <Button variant="primary" className='d-none' onClick={handleShow} ref={ref}>
                Launch demo modal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <div className='container'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label >Title</Form.Label>
                            <Form.Control type="text" name="e_title" placeholder="Title..." onChange={onchange} value={note.e_title} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label >Author</Form.Label>
                            <Form.Control type="text" name="e_author" placeholder="Author..." onChange={onchange} value={note.e_author} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label >Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="e_description" onChange={onchange} value={note.e_description} />
                        </Form.Group>
                    </Form>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} disabled={note.e_title.length <= 5 || note.e_description.length <= 5 || note.e_author.length === 0}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='row'>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes;