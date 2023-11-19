import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import noteContext from '../context/notes/noteContext'

function NoteItem(props) {
    const { note, updateNote } = props;

    const context = useContext(noteContext);
    const { deletenote } = context;

    return (
        <div className='col-md-3'>
            <Card className='m-2'>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>{note.description}</Card.Text>
                    <Card.Text>{note.author}</Card.Text>
                    <div className="d-flex justify-content-between">
                        <i className="fa-solid fa-trash" onClick={() => { deletenote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NoteItem
