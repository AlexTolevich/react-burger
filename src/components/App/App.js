import React from 'react';
import style from './App.module.css';
import Constructor from "../../pages/Constructor/Constructor";
import {Routes, Route} from 'react-router-dom';
import NotFound from "../../pages/NotFound/NotFound";
import Login from "../../pages/Login/Login";
import AppHeader from "../AppHeader/AppHeader";
import Register from "../../pages/Register/Register";

function App() {

  return (
    <div className={style.App}>
      <AppHeader/>
      <Routes>
        <Route path="/"
               element={
                 <Constructor/>
               }/>
        <Route path="/register"
               element={
                 <Register/>
               }/>
        <Route path="/login"
               element={
                 <Login/>
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
