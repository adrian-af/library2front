import '../styles/AddBook.css';
import '../styles/App.css';
import ReactDOM from "react-dom";
import { Spinner } from 'react-bootstrap';
import Select from "react-select";
import React, { useEffect, useState } from 'react';
import ModalNewAuthor from './ModalNewAuthor';
import ModalNewGenre from './ModalNewGenre';

export const AddBook = () =>   {
    const [authorData, setAuthorData] = useState([]);
    const [authorPopup, setAuthorPopup] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genreData, setGenreData] = useState([]);
    const [genrePopup, setGenrePopup] = useState(false);
  
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/author/allOrdered')
        .then(response =>  {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(jsonData => setAuthorData(jsonData))
        .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost:8080/api/v1/genre/allOrdered')
        .then(response =>  {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(jsonData => setGenreData(jsonData))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const authorsSelect = authorData.map((oneAuthor) => ({
        value: oneAuthor.idAuthor,
        label: `${oneAuthor.firstName} ${oneAuthor.lastName}`,
    }));

    const genresSelect = genreData.map((oneGenre) =>({
        value: oneGenre.idGenre,
        label: oneGenre.name,
    }))
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAuthor) {
      console.log("Selected author ID:", selectedAuthor.value);
      console.log("Selected author name:", selectedAuthor.label);
    } else {
      console.log("No author selected");
    }
  };
       return(
        <div className='position-fixed start-0 d-flex justify-content-center align-items-center page-container'>
            <div id="pageContent" className='modalContainer bg-white rounded shadow-lg d-flex flex-column'>
                <h1>Add a book</h1>
                <div>
                    <form onSubmit={handleSubmit} id="forms">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <label htmlFor="title">Title</label>
                            <input id="title" name='title' type="text" className='form-control flex-grow-1'></input>
                        </div>
                        <div className='mb-2 text-end'>
                            <div className="d-flex align-items-center mb-1">
                                <label htmlFor="author">Author</label>
                                <Select options={authorsSelect} isSearchable value={selectedAuthor} onChange={setSelectedAuthor} placeholder="Select author..." className="react-select form-control flex-grow-1"/>
                            </div>
                            <button type='button' className='btn btn-secondary form-control' id='new-author' onClick={() => setAuthorPopup(true)}>+ New author</button>
                            {
                                authorPopup && ReactDOM.createPortal(
                                <ModalNewAuthor closeModalNewAuthor={() => setAuthorPopup(false)} />,
                                document.body
                                )    
                            }
                        </div>
                        <div className='mb-2 text-end'>
                            <div className="d-flex align-items-center mb-1">
                                <label htmlFor="author">Genre</label>
                                <Select options={genresSelect} isSearchable value={selectedGenre} onChange={setSelectedGenre} placeholder="Select genre..." className="react-select form-control flex-grow-1"/>
                            </div>
                            <button type='button' className='btn btn-secondary form-control' id='new-author' onClick={() => setGenrePopup(true)}>+ New genre</button>
                            {
                                genrePopup && ReactDOM.createPortal(
                                <ModalNewGenre closeModalNewGenre={() => setGenrePopup(false)} />,
                                document.body
                                )    
                            }
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <label htmlFor="genre">Genre</label>
                            <input id="genre" name='genre' type="text" className='form-control flex-grow-1'></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       );
    };