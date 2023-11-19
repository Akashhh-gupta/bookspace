import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import noteContext from '../context/notes/noteContext'
import { Button } from 'react-bootstrap';

function AddNote() {

    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setnote] = useState({ title: "", author: "", description: "" })

    //Adding note
    const handleAdd = (e) => {
        e.preventDefault(); // Prevent reload on button click
        addnote(note.title, note.author, note.description); //Passing title-n-all
        setnote({ title: "", author: "", description: "" })
    }

    //Onchange function lets you or write in the textbox
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <div className='container'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Title..." value={note.title} onChange={onchange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >Author</Form.Label>
                    <Form.Control type="text" name="author" placeholder="Author..." value={note.author} onChange={onchange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label >Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" placeholder="Description..." value={note.description} onChange={onchange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleAdd} disabled={note.title.length <= 5 || note.description.length <= 5 || note.author.length === 0}>
                    Add Note
                </Button>
            </Form>
        </div>
    )
}

export default AddNote