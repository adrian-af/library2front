//App.js
import './styles/App.css';
import React from "react";
import {MyHeader} from './components/MyHeader';
import { AddBook } from './components/AddBook';
import { AddCopy } from './components/AddCopy';
import { HomeContent } from './components/HomeContent';
import { Manage } from './components/Manage';
import { Footer } from './components/Footer';
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
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
