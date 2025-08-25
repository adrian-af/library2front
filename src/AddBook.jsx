import './AddBook.css';
import { Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

export const AddBook = () =>   {
    const [data, setData] = useState([]);
  
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
        <p id="pageContent">
            <h1>Add a copy</h1>
            <div>
                <form id="forms">
                    <label for="title">Title</label>
                    <input id="title" name='title' type="text"></input>
                    <p/>
                    <label for="author">Author</label>
                    <select id="author" name="author">
                        <option disabled selected>Select author...</option>
                        {data.map((author) => (
                            <option key={author.idAuthor}>{ author.firstName } {author.lastName } </option>
                        ))}
                    </select>
                    <a>+ New author</a>
                        


        
                </form>
            </div>
        </p>
       );
    };