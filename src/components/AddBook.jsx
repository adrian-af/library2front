import '../styles/AddBook.css';
import '../styles/App.css';
import ReactDOM from "react-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Spinner } from 'react-bootstrap';
import Select from "react-select";
import React, { useEffect, useState } from 'react';
import ModalNewAuthor from './ModalNewAuthor';
import ModalNewGenre from './ModalNewGenre';
import ModalNewPublisher from './ModalNewPublisher';

export const AddBook = () =>   {
    const [authorData, setAuthorData] = useState([]);
    const [authorPopup, setAuthorPopup] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genreData, setGenreData] = useState([]);
    const [genrePopup, setGenrePopup] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [languagesData, setLanguagesData] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [publishersData, setPublishersData] = useState([]);
    const [publisherPopup, setPublisherPopup] = useState(false);
  
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

        fetch('http://localhost:8080/api/v1/book/getLanguages')
        .then(response =>  {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(jsonData => setLanguagesData(jsonData))
        .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost:8080/api/v1/publisher/allOrdered')
        .then(response =>  {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(jsonData => setPublishersData(jsonData))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const authorsSelect = authorData.map((oneAuthor) => ({
        value: oneAuthor.idAuthor,
        label: `${oneAuthor.firstName} ${oneAuthor.lastName}`,
    }));

    const genresSelect = genreData.map((oneGenre) =>({
        value: oneGenre.idGenre,
        label: oneGenre.name
    }));

    const languagesSelect = languagesData.map((oneLanguage) => ({
        value: oneLanguage,
        label: oneLanguage
    }));

    const publishersSelect = publishersData.map((onePublisher) => ({
        value: onePublisher.idPublisher,
        label: onePublisher.name
    }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAuthor) {
      console.log("Selected author ID:", selectedAuthor.value);
      console.log("Selected author name:", selectedAuthor.label);
    } else {
      console.log("No author selected");
    }
    console.log("languages: " + languagesData);
  };
       return(
        <div className='position-fixed start-0 w-100 d-flex justify-content-center align-items-center page-container'>
            <div id="pageContent" className='modalContainer bg-white rounded shadow-lg d-flex flex-column'>
                <h1>Add a book</h1>
                <div>
                    <form onSubmit={handleSubmit} id="forms">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <label htmlFor="title">Title<span class="needed">*</span></label>
                            <input id="title" name='title' type="text" className='form-control flex-grow-1'></input>
                        </div>
                        <hr/>
                        <div className='mb-2 text-end'>
                            <div className="d-flex align-items-center mb-1">
                                <label htmlFor="author">Author<span class="needed">*</span></label>
                                <Select options={authorsSelect} isSearchable value={selectedAuthor} onChange={setSelectedAuthor} placeholder="Select author..." className="react-select form-control flex-grow-1"/>
                            </div>
                            <button type='button' className='btn btn-secondary form-control button-new' onClick={() => setAuthorPopup(true)}>+ New author</button>
                            {
                                authorPopup && ReactDOM.createPortal(
                                <ModalNewAuthor closeModalNewAuthor={() => setAuthorPopup(false)} />,
                                document.body
                                )    
                            }
                        </div>
                        <hr/>
                        <div className='mb-2 text-end'>
                            <div className="d-flex align-items-center mb-1">
                                <label htmlFor="genre">Genre<span class="needed">*</span></label>
                                <Select options={genresSelect} isSearchable value={selectedGenre} onChange={setSelectedGenre} placeholder="Select genre..." className="react-select form-control flex-grow-1"/>
                            </div>
                            <button type='button' className='btn btn-secondary form-control button-new' onClick={() => setGenrePopup(true)}>+ New genre</button>
                            {
                                genrePopup && ReactDOM.createPortal(
                                <ModalNewGenre closeModalNewGenre={() => setGenrePopup(false)} />,
                                document.body
                                )    
                            }
                        </div>
                        <hr/>
                        <div className='d-flex justify-content-center align-items-center gap-2 mb-2'>
                            <label>
                                <input type="radio" name="fiction" value="true" defaultChecked/>
                                Fiction
                            </label>
                            <label>
                                <input type="radio" name="fiction" value="false"/>
                                Non-fiction
                            </label>
                        </div>
                        <hr/>
                        <div className='d-flex align-items-center gap-2 mb-2'>
                           <label htmlFor="pages">Number of pages</label>
                            <input id="pages" name='pages' type="number" className='form-control flex-grow-1'></input> 
                        </div>
                        <hr/>
                        <div className='d-flex align-items-center gap-2 mb-2'>
                           <label htmlFor="year">Year of printing 
                                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">The year in which this particular edition of the book was printed, not the year of publication</Tooltip>} >
                                    <span>❔</span>
                                </OverlayTrigger>
                            </label>
                            <input id="year" name='year' type="number" className='form-control flex-grow-1'></input> 
                        </div>
                        <hr/>
                        <div className='d-flex align-items-center gap-2 mb-2'>
                            <label htmlFor="image">Cover image (URL)</label>
                            <input id="image" name='image' type="text" className='form-control flex-grow-1' pattern="^http.*\.(jpg|jpeg|png|gif|webp)$" title="Must be a valid image URL (http:// or https:// ending with .jpg, .png, .gif, .webp)"/>
                        </div>
                        <hr/>
                        <div className='mb-2 text-end'>
                            <div className="d-flex align-items-center mb-1">
                                <label htmlFor="language">Language<span class="needed">*</span></label>
                                <Select options={languagesSelect} isSearchable value={selectedLanguage} onChange={setSelectedLanguage} placeholder="Select language..." className="react-select form-control flex-grow-1"/>
                            </div>
                        </div>
                        <hr/>
                        <div className='mb-2 text-end'>
                            <div className="d-flex align-items-center mb-1">
                                <label htmlFor="publisher">Publisher</label>
                                <Select options={publishersSelect} isSearchable value={selectedPublisher} onChange={setSelectedPublisher} placeholder="Select publisher..." className="react-select form-control flex-grow-1"/>
                            </div>
                            <button type='button' className='btn btn-secondary form-control button-new' id='new-publisher' onClick={() => setPublisherPopup(true)}>+ New publisher</button>
                            {
                                publisherPopup && ReactDOM.createPortal(
                                <ModalNewPublisher closeModalNewPublisher={() => setPublisherPopup(false)} />,
                                document.body
                                )    
                            }
                        </div>
                        <hr/>
                        <div className='d-flex align-items-center gap-2 mb-2'>
                            <label htmlFor="ISBN">ISBN</label>
                            <input id="isbn" name='isbn' type="text" className='form-control flex-grow-1'/>
                        </div>
                        <hr/>
                        <div>
                            <button className='btn btn-primary'>Add book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       );
    };