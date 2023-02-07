import React from 'react';
import {Navigate} from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';
import {getLoggedIn} from "../../services/selectors/selectors";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function ProtectedRoute({children}) {
  const loggedIn = useSelector(getLoggedIn);

  if (loggedIn === null) {
    return <>
      <Preloader/>
    </>

  }

  if (loggedIn !== true) {
    return <Navigate to="/login"/>
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ProtectedRoute;