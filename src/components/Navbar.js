import React, { useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NoteContext from '../context/Context';


const Navbar = () => {
    const { funcLogout, login } = useContext(NoteContext)
    const location = useLocation()
    const ref = useRef()
    const click = ()=> {
        if(window.innerWidth <= 990){
            ref.current.click()
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" ref={ref} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''} `} onClick={click} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/list' ? 'active' : ''} `} onClick={click} to="/list">List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''} `} onClick={click} to="/about">About</Link>
                            </li>
                        </ul>

                        <div className="d-flex">
                            <Link className={`btn btn-outline-success mx-1 ${login === true ? 'd-none' : 'nono'}`} to='/signin'>SignIn</Link>
                            <Link className={`btn btn-outline-success ${login === true ? 'd-none' : 'nono'}`} to="/signup" >SignUp</Link>
                            <div className={`btn btn-outline-danger ${login === true ? 'nono' : 'd-none'}`} onClick={funcLogout}>Logout</div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;