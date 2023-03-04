import React, {useEffect} from 'react';
import style from "./OrderInfoPage.module.css";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
import {useDispatch, useSelector} from "../../services/hooks";
import {getCookie} from "../../utils/cookies";
import {getUserOrders} from "../../services/constants/selectors";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_STOP
} from "../../services/constants/wsAction";
import {refreshToken} from "../../utils/Api";
import {useLocation} from "react-router-dom";

function OrderInfoPage() {
  const path = useLocation();
  const dispatch = useDispatch();
  const {data} = useSelector(getUserOrders);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    if (path.pathname.includes("/profile")) {
      if (data.includes('Invalid or missing token') || !accessToken) {
        refreshToken()
          .then(() => {
            dispatch({type: WS_USER_CONNECTION_START})
          })
          .catch((err) => console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'))
      } else {
        dispatch({type: WS_USER_CONNECTION_START})
      }
    } else {
      dispatch({type: WS_CONNECTION_START})
    }
    return () => {
      dispatch(path.pathname.includes("/profile")
        ? {type: WS_USER_CONNECTION_STOP}
        : {type: WS_CONNECTION_STOP})
    }
  }, []);

  return (
    <section className={style.container}>
      <OrderInfo/>
    </section>
  )
}

export default OrderInfoPage;
