import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {getLoggedIn} from "../../services/selectors/selectors";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function ProtectedRoute({children, anonymous = false}) {
  const loggedIn = useSelector(getLoggedIn);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && loggedIn) {
    return <Navigate to={from}/>;
  }

  if (!anonymous && !loggedIn) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  anonymous: PropTypes.bool
}

export default ProtectedRoute;