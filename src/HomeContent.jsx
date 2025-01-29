import './HomeContent.css';
import React, { useEffect, useState } from 'react';
import { ViewList } from './ViewList';

export const HomeContent = () => {
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

  if (data.length === 0) return <p>Loading...</p>;

  return (
    <div id="pageContent">
        <h1>Your collection</h1>
        <div id="filters">
            <form>
                
            </form>
        </div>
        <hr/>
        <ViewList/>
    </div>
  );
};
