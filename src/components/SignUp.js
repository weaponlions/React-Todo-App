import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/Context';

const SignUp = () => {
    const navigate = useNavigate()
    const context = useContext(NoteContext)

    useEffect(() => {
        if (context.login === true) {
            navigate('/')
        }
    })


    const submitHandleSignUp = async (e) => {
        e.preventDefault();
        const password = document.getElementById('InputPassword').value;
        const confrim_password = document.getElementById('InputConfirmPassword').value;
        if (password === confrim_password) {
            const data = {
                'first_name': document.getElementById('InputFirstname').value,
                'last_name': document.getElementById('InputLastname').value,
                'email': document.getElementById('InputEmail').value,
                'username': document.getElementById('InputUsername').value,
                'password': document.getElementById('InputPassword').value,
            }
            const send = await fetch('http://127.0.0.1:8000/api/notes/registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let js_data = await send.json()
            if ('status' in js_data) {
                let status = js_data.status;
                // SignUp SuccessFul but Token Not Available
                if (status === 200) {
                    // call a alert
                    context.alert.show('Oh look, SignUp Successful and Now Login Please!')
                    console.log(status);
                    context.setLogin(false)
                    navigate('/signin');
                }
                // if Token is Availaible
                else if (status === 202) {
                    let token = js_data.token
                    localStorage.setItem('token', token)
                    context.setLogin(true)
                    context.alert.show('Oh look, You Login Successfully!')
                    navigate('/');
                }
                // Username is Already Exist
                else if (status === 226) {
                    // call a alert
                    context.alert.show('Oh look, Username already exists!')
                    console.log(status);
                }
                // Serializer Error and Any Error of Unique Fields
                else if (status === 400) {
                    // call a alert
                    context.alert.show(`Oh look, Error Generated ! ${status}`)
                    console.log(status);
                }
                // Field Required Error
                else if (status === 403) {
                    //call a alert
                    alert.show('Oh look, All field are Required!')
                    console.log(status);
                }
            }
        }
        else {
            //call a alert
            context.alert.show('Password is Not Match')
        }
    }

    return (
        <>
            <div className="container">
                <h1>SignUp</h1>
                <form onSubmit={submitHandleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="InputFirstname" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="InputFirstname" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputLastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="InputLastname" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="InputUsername" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="InputPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputConfirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="InputConfirmPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </form>
            </div>
        </>
    )
}

export default SignUp