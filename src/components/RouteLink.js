import React from 'react'
import Navbar from './Navbar';
import Notes from './Notes';
import NotesList from './NotesList';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 const RouteLink = () => {
  return (
    <>
        <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Notes />} />
            <Route path='/list' element={<NotesList />} />
            <Route path='/about' element={<About />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default RouteLink;