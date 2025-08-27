import '../styles/AddBook.css';
import { Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ModalNewAuthor from './ModalNewAuthor';

export const AddBook = () =>   {
    const [data, setData] = useState([]);
    const [authorPopup, setAuthorPopup] = useState(false);
    const [author, setAuthor] = useState("");
  
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/author/all')
        .then(response =>  {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(jsonData => setData(jsonData))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (data.length === 0) return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span></Spinner>;
       return(
        <div id="pageContent">
            <h1>Add a book</h1>
            <div>
                <form id="forms">
                    <label htmlFor="title">Title</label>
                    <input id="title" name='title' type="text"></input>
                    <p/>
                    <label htmlFor="author">Author</label>
                    <select id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)}>
                        <option disabled value="">Select author...</option>

                        {data
                        .slice() // make a shallow copy so we don't mutate state directly
                        .sort((a, b) => a.lastName.localeCompare(b.lastName))
                        .map((author) => (
                            <option key={author.idAuthor}>{ author.firstName } {author.lastName } </option>
                        ))}
                    </select>
                </form>
            </div>
            <button type='button' onClick={() => setAuthorPopup(true)}>+ New author</button>
            {
                authorPopup && <ModalNewAuthor closeModalNewAuthor={setAuthorPopup}/>    
            }

        
        </div>
       );
    };