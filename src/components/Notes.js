import React, { useContext, useEffect } from 'react';
import CreateNotes from './CreateNotes';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/Context';



const Notes = () => {
    const { login, setLogin } = useContext(NoteContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!('token' in localStorage)) {
            setLogin(false)
            navigate('/signin')
        }
    })


    return (
        <>
            {login === true ? '' : navigate('/signin')}
            <div className="container">
                <h3 className='m-3' >Notes</h3>
                <CreateNotes />
            </div>
        </>
    )
}

export default Notes;