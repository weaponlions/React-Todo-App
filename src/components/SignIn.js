import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/Context';


const SignIn = () => {
    const context = useContext(NoteContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (context.login === true) {
            navigate('/');
        }

    })

    const submitHandleSignIn = async (e) => {
        e.preventDefault();
        const data = {
            'username': document.getElementById('InputUsername').value,
            'password': document.getElementById('InputPassword').value
        }
        const send = await fetch("https://backendapitodo.herokuapp.com/api/notes/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let js_data = await send.json()
        if ('status' in js_data) {
            let status = js_data.status;
            // SignIn SuccessFul Token Available
            if (status === 202) {
                localStorage.clear()
                let token = js_data.token
                localStorage.setItem('token', token)
                context.setLogin(true)
                context.alert('Oh look, You Login Successfully!')
                navigate(-1);
            }
            // Field Required Error
            else if (status === 403) {
                // call a alert
                context.alert('Oh look, All field are Required!')
                console.log(status);
            }
            // Invalid username and password
            else if (status === 404) {
                //call a alert
                context.alert('Oh look, Invalid Username and Password!')
                console.log(status);
            }
        }
    }
    return (
        <>
            <div className="container">
                <h1>SignIn</h1>
                <form onSubmit={submitHandleSignIn} >
                    <div className="mb-3">
                        <label htmlFor="InputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="InputUsername" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="InputPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">SignIn</button>
                </form>
            </div>
        </>
    )
}

export default SignIn