//App.js
import './App.css';
import React from "react";
import {MyHeader} from './MyHeader';
import { Add } from './Add';
import { HomeContent } from './HomeContent';
import { Manage } from './Manage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header fixed-top">
          <MyHeader/>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<Add />} />
            <Route path="/manage" element={<Manage />} />
          </Routes>
        </header>
      </BrowserRouter>
      <div id="mainContainer">
        <div id="divList" className='container rounded shadow'>
          <HomeContent/>
        </div>
      </div>
    </div>
  );
}

export default App;
