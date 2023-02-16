import React, {FC, JSXElementConstructor, ReactElement, ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {getLoggedIn} from "../../services/selectors/selectors";
import {useSelector} from "react-redux";
import {IProtectedRouteProps} from "../../utils/types";

// @ts-ignore
const ProtectedRoute: FC<IProtectedRouteProps> = ({children, anonymous = false}) => {
  const loggedIn = useSelector(getLoggedIn);
  const location = useLocation();

  // @ts-ignore
  const from = location.state?.from || '/';

  if (anonymous && loggedIn) {
    return <Navigate to={from}/>;
  }

  if (!anonymous && !loggedIn) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return children;
}

export default ProtectedRoute;
