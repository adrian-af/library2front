import '../styles/ViewList.css';
import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";

export const ViewList = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/book/all')
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
  <span className="visually-hidden">Loading...</span>
</Spinner>;

  return (
<div>
  <div id="count" className='text-start ps-4'>
    Results: {data.length}
  </div>
  <table border="1">
  <thead>
    <tr>
      <th>Cover</th>
      <th>Book ID</th>
      <th>Title</th>
      <th>Author</th>
      <th>Genre</th>
      <th>Fiction</th>
      <th>Publisher</th>
      <th>Language</th>
    </tr>
  </thead>
  <tbody>
  {data.map((book) => (
    <tr key={book.idBook}>
      <td><img src={book.coverImage} alt="Book cover" /></td>
      <td>{book.idBook}</td>
      <td>{book.title}</td>
      <td>{book.author[0]?.lastName}, {book.author[0]?.firstName}</td>
      <td>{book.genre.name.charAt(0).toUpperCase() + book.genre.name.slice(1)}</td>
      <td>{book.fiction ? "Yes" : "No"}</td>
      <td>{book.publisher}</td>
      <td>{book.language.charAt(0) + book.language.slice(1).toLowerCase()}</td>
    </tr>
        ))}
  </tbody>
</table>
</div>

  );
};

