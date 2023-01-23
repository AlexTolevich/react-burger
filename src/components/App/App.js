import React from 'react';
import style from './App.module.css';
import Main from "../Main/Main";
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className={style.App}>
      <Routes>
        <Route path="/"
               element={
                 <Main/>
               }/>
      </Routes>
    </div>
  );
}

export default App;
