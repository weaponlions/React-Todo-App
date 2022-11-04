import React, { useRef, useContext, useState, useEffect } from 'react';
import NotesItem from './NotesItem';
import NoteContext from '../context/Context';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";


export default function NotesList() {
    // use Context
    const context = useContext(NoteContext)
    const navigate = useNavigate()

    //top loadin bar
    const [progress, setProgress] = useState(0)
    // // load loading bar top
    useEffect(() => {
        setProgress(progress + 30)
        if (!('token' in localStorage)) {
            context.setLogin(false)
            localStorage.clear()
            context.alert('Oh look, Login Session Expired')
            navigate('/signin')
            setProgress(progress + 100)
        } else {
            try {
                (async () => {
                    let url = 'https://backendapitodo.herokuapp.com/api/notes/'
                    let data = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    let js_data = await data.json()
                    if (js_data.code === 'token_not_valid') {
                        localStorage.removeItem('token')
                    } else {
                        context.setNotes(js_data)
                        context.setLoad(true)
                    }
                })();
            } catch (error) {
                localStorage.clear()
                context.setLogin(false)
                context.alert('Oh look, Login Session Expired')
            }
            setProgress(progress + 100)
        }
    },
        // eslint-disable-next-line
        [])
    // reference instance
    const ref = useRef(null)
    const [upnote, setUpnote] = useState({
        uptag: '',
        uptitle: '',
        updescription: ''
    });
    // handle Update input text 
    const handleInputClick = (e) => {
        setUpnote({ ...upnote, [e.target.name]: e.target.value });
    }

    // handle Edit Modal or Move value to modal field
    const handleEdit = (currentNote) => {
        ref.current.click();
        setUpnote({
            uptag: currentNote.tag,
            uptitle: currentNote.title,
            updescription: currentNote.description,
            upid: currentNote.id
        })
    }

    // update notes
    const handleUpdate = () => {
        ref.current.click();
        confirmAlert({
            title: 'Confirm to Update Record',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => context.funcUpdate(upnote.uptag, upnote.uptitle, upnote.updescription, upnote.upid)
                },
                {
                    label: 'No'
                },
            ]
        })
    }

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => context.funcDelete(id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }
    // load more data
    const fetchData = async () => {
        let url = context.notes.next
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        let js_data = await data.json()
        if (js_data.code === 'token_not_valid') {
            localStorage.removeItem('token')
            navigate('/')
            return false;
        } else {
            context.setNotes({
                count: context.notes.count,
                next: js_data.next,
                results: context.notes.results.concat(js_data.results)
            })
        }
    }

    //search data
    const funcSearch = async (e) => {
        e.preventDefault()
        let value = document.getElementById('search').value;
        let url = `https://backendapitodo.herokuapp.com/api/notes/?search=${value}`
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        let js_data = await data.json()
        console.log(js_data);
        if (js_data.code === 'token_not_valid') {
            localStorage.removeItem('token')
            navigate('/')
            return false;
        } else {
            context.setNotes({
                count: context.notes.count,
                next: js_data.next,
                results: js_data.results
            })
        }

    }
    return (
        <>
            {context.login === true ? '' : navigate('/signin')}
            <div className="container my-4 mx-auto w-50">
                <form className="d-flex justify-content-center" role="search" onSubmit={funcSearch} >
                    <input className="form-control me-2" id='search' type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div className="container">
                {context.load === true ? <InfiniteScroll
                    dataLength={context.notes.count || 0} //This is important field to render the next data
                    next={fetchData}
                    hasMore={context.notes.next !== null ? true : false}
                    loader={
                        <div className=" text-center" >
                            <div className="spinner-grow text-center" style={{ "width": "4rem", "height": "4rem" }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        {context.notes.results && context.notes.results.length === 0 ? 'No Data Found': 
                            <b>Yay! You have seen it all</b> }
                        </p>
                    }
                >
                    <div className="container">
                        <div className="row row-cols-1">
                            {context.notes.results && context.notes.results.map((ele) => {
                                return (<NotesItem handleEdit={handleEdit} tag={ele.tag} note={ele} handleClickDelete={handleDelete} title={ele.title} key={ele.slug || (Math.floor(Math.random() * 100) + 1)} description={ele.description} id={ele.id} />)
                            })}
                        </div>
                    </div>
                </InfiniteScroll> : 'No Data Found'}
            </div>

            <button className="btn d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="form-group mb-3">
                                    <input className="form-control" id="uptitle" value={upnote.uptitle} name='uptitle' placeholder="Title here..." onChange={handleInputClick} ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <input className="form-control" id="uptag" value={upnote.uptag} name='uptag' placeholder="Tag here..." onChange={handleInputClick} ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <textarea className="form-control" id="updescription" value={upnote.updescription} name='updescription' rows="7" placeholder="Write something here..." onChange={handleInputClick} ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            <div className="btn btn-primary m-4" onClick={handleUpdate}>Submit</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
