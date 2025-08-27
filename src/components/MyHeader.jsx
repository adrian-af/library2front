// MyHeader.js
import '../styles/MyHeader.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';

export const MyHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top m-0 p-0" id="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#home"><img src="/localLibrary.png" alt="logo" height="60em"></img></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item mx-3">
              <Dropdown>
                <DropdownButton key="add" title="Add">
                  <Dropdown.Item as={Link} to="/addBook">Add Book</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/addCopy">Add Copy</Dropdown.Item>
                </DropdownButton>
              </Dropdown>
              
            </li>
            <li className="nav-item mx-3">
              <Link to="/manage">Manage</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
