import React from 'react';
import style from './App.module.css';
import Main from "../Main/Main";
import {Routes, Route} from 'react-router-dom';
import NotFound from "../../pages/NotFound/NotFound";

function App() {

  return (
    <div className={style.App}>
      <Routes>
        <Route path="/"
               element={
                 <Main/>
               }/>
        <Route path="*"
               element={
                 <NotFound/>
               }/>
      </Routes>
    </div>
  );
}

export default App;
