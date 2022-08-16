
import NoteContext from './context/Context';
import Routes from './components/RouteLink';
import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useAlert } from 'react-alert';


function App() {
  //alert obj
  const alert = useAlert()
  // login state status
  const [login, setLogin] = useState(true)
  //top loadin bar
  const [progress, setProgress] = useState(0)

  const [load, setLoad] = useState(false)
  // store notes
  const [notes, setNotes] = useState('');
  // Add notes handle
  const [note, setNote] = useState({
    tag: '',
    title: '',
    description: '',
  });


  useEffect(() => {
    if (!('token' in localStorage)) {
      setLogin(false)
      localStorage.clear()
    }
  },
    // eslint-disable-next-line
    [])

  // add notes
  const funcAdd = async (tag, title, description) => {
    try {
      let url = 'http://127.0.0.1:8000/api/notes/'
      // eslint-disable-next-line
      const msg = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tag: tag,
          title: title,
          description: description
        })
      }).then(() => {
        setNote({
          tag: '',
          title: '',
          description: ''
        });
      })
      setProgress(progress + 50)
      setProgress(100)
      alert.show('Oh look, Data Post Successfully!')

    } catch (error) {
      alert.show('Oh look, Data Not Post!' + error)
    }
  }

  // delete notes
  const funcDelete = async (id) => {
    try {
      let url = 'http://127.0.0.1:8000/api/notes/' + id + '/';
      // eslint-disable-next-line 
      let data = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
        }
      }).then(() => {
        setProgress(progress + 30)
        let newNote = JSON.parse(JSON.stringify(notes.results))
        setProgress(progress + 60)
        newNote = newNote.filter(function (obj) {
          return obj.id !== id;
        });
        setNotes({
          count: notes.count,
          next: notes.next,
          results: newNote
        })
        setProgress(100)
        alert.show('Oh look, Data Delete Succesfully!')
      })
    } catch (err) {
      setProgress(100)
      alert.show('Oh look, Data Not Delete!')
    }
  }

  // update notes
  const funcUpdate = async (tag, title, description, id) => {
    try {
      let url = 'http://127.0.0.1:8000/api/notes/' + id + '/'
      // eslint-disable-next-line 
      let data = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag
        })
      })
      setProgress(progress + 10)
      let newNote = await JSON.parse(JSON.stringify(notes.results))
      for (let index = 0; index < newNote.length; index++) {
        let ele = newNote[index]
        if (ele.id === id) {
          newNote[index].tag = tag
          newNote[index].title = title
          newNote[index].description = description
          setProgress(progress + 50)
          break;
        }
      }
      setProgress(100)
      setNotes({
        count: notes.count,
        next: notes.next,
        results: newNote
      })
      alert.show('Oh look, Data Update Successfully!')

    } catch (error) {
      console.log(error);
    }
  }

  //logout func
  const funcLogout = () => {
    localStorage.clear()
    setLogin(false)
    setNotes('')
    alert.show('Oh look, You Logout Successfully!')
  }
  return (
    <>
      <NoteContext.Provider value={{ notes, setNotes, funcDelete, funcUpdate, funcAdd, note, setNote, funcLogout, alert, login, setLogin, load, setLoad }}>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes />
      </NoteContext.Provider>
    </>
  );
}

export default App;
