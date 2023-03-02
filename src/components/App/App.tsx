import React, {useEffect} from 'react';
import style from './App.module.css';
import Constructor from "../../pages/Constructor/Constructor";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import NotFound from "../../pages/NotFound/NotFound";
import Login from "../../pages/Login/Login";
import AppHeader from "../AppHeader/AppHeader";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import {useDispatch} from "../../services/hooks";
import {getIngredients} from "../../services/actions/ingredients";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage/IngredientDetailsPage";
import {onGetUser} from "../../services/actions/user";
import {Feed} from "../../pages/Feed/Feed";
import Orders from "../../pages/Orders/Orders";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    dispatch(onGetUser());
    dispatch(getIngredients());
  }, []);

  function onCloseModal() {
    navigate(-1);
  }

  return (
    <div className={style.App}>
      <AppHeader/>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/"
               element={
                 <Constructor/>
               }/>
        <Route path="/register"
               element={
                 <ProtectedRoute anonymous={true}>
                   <Register/>
                 </ProtectedRoute>
               }/>
        <Route path="/login"
               element={
                 <ProtectedRoute anonymous={true}>
                   <Login/>
                 </ProtectedRoute>
               }/>
        <Route path="/forgot-password"
               element={
                 <ProtectedRoute anonymous={true}>
                   <ForgotPassword/>
                 </ProtectedRoute>
               }/>
        <Route path="/reset-password"
               element={
                 <ProtectedRoute anonymous={true}>
                   <ResetPassword/>
                 </ProtectedRoute>
               }/>
        <Route path="/profile"
               element={
                 <ProtectedRoute>
                   <Profile/>
                 </ProtectedRoute>
               }/>
        <Route path="/profile/orders"
               element={
                 <ProtectedRoute>
                   <Orders/>
                 </ProtectedRoute>
               }/>
        <Route path="/profile/orders/:id"
               element={
                 <ProtectedRoute>
                   <Orders/>
                 </ProtectedRoute>
               }/>
        <Route path="/ingredients/:id"
               element={
                 <IngredientDetailsPage/>
               }/>
        <Route path="/feed"
               element={
                 <Feed/>
               }/>
        <Route path="*"
               element={
                 <NotFound/>
               }/>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<Modal onClose={onCloseModal} title="Детали ингредиента">
            <IngredientDetails/>
          </Modal>}/>
        </Routes>
      )}
    </div>
  );
}

export default App;
