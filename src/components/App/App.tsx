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
import {useDispatch} from "react-redux";
import {DEL_VIEWED_INGREDIENT, getIngredients, onGetUser} from "../../services/actions";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage/IngredientDetailsPage";

function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    // @ts-ignore
    dispatch(onGetUser());
    // @ts-ignore
    dispatch(getIngredients());
  }, []);

  function onCloseModal() {
    navigate(-1);
    dispatch({type: DEL_VIEWED_INGREDIENT});

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
                 <Register/>
               }/>
        <Route path="/login"
               element={
                 <Login/>
               }/>
        <Route path="/forgot-password"
               element={
                 <ForgotPassword/>
               }/>
        <Route path="/reset-password"
               element={
                 <ResetPassword/>
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
                   <Profile/>
                 </ProtectedRoute>
               }/>
        <Route path="/profile/orders/:id"
               element={
                 <ProtectedRoute>
                   <Profile/>
                 </ProtectedRoute>
               }/>
        <Route path="/ingredients/:id"
               element={
                 <IngredientDetailsPage/>
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
