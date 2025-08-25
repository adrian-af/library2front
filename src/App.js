//App.js
import './App.css';
import React from "react";
import {MyHeader} from './MyHeader';
import { AddBook } from './AddBook';
import { AddCopy } from './AddCopy';
import { HomeContent } from './HomeContent';
import { Manage } from './Manage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <MyHeader/>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/addCopy" element={<AddCopy />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/manage" element={<Manage />} />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
