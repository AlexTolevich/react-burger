import React, {FC} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {getLoggedIn} from "../../services/constants/selectors";
import {IProtectedRouteProps, TLocationState} from "../../utils/types";
import {useSelector} from "../../services/hooks";

const ProtectedRoute: FC<IProtectedRouteProps> = ({children, anonymous = false}) => {
  const loggedIn = useSelector(getLoggedIn);
  const location = useLocation();
  const {from} = location.state as TLocationState || "/";

  if (anonymous && loggedIn) {
    return <Navigate to={from?.pathname ? from?.pathname : '/'}/>;
  }

  if (!anonymous && !loggedIn) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return children;
}

export default ProtectedRoute;
