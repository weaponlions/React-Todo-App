import React, { useContext } from 'react';
import NoteContext from '../context/Context'



function CreateNotes() {
    const { note, setNote, funcAdd } = useContext(NoteContext)

    const handleClick = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        funcAdd(note.tag, note.title, note.description);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <input className="form-control" id="title" autoFocus name='title' value={note.title} placeholder="Title here..." onChange={handleClick} ></input>
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" id="tag" name='tag' value={note.tag} placeholder="Tag here..." onChange={handleClick} required></input>
                </div>
                <div className="form-group mb-3">
                    <textarea className="form-control" id="description" name='description' value={note.description} rows="7" placeholder="Write something here..." onChange={handleClick} required></textarea>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary m-4"  />
                    
            </form>
        </div>
    )
}

export default CreateNotes
