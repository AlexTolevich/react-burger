import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';
import {getLoggedIn} from "../../services/selectors/selectors";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function ProtectedRoute({children}) {
  const location = useLocation();
  const loggedIn = useSelector(getLoggedIn);

  if (loggedIn !== true) {
    return <Navigate to={"/login"} state={{from: location}} replace/>
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ProtectedRoute;