import React, {useEffect} from 'react';
import style from './Orders.module.css';
import ProfileNavMenu from "../../components/ProfileNavMenu/ProfileNavMenu";
import {IFeedOrderItem} from "../../utils/types";
import {OrderItem} from "../../components/OrderItem/OrderItem";
import {useDispatch, useSelector} from "../../services/hooks";
import {WS_USER_CONNECTION_START, WS_USER_CONNECTION_STOP} from "../../services/constants/wsAction";
import {getUserOrders} from "../../services/constants/selectors";
import {getCookie} from "../../utils/cookies";

function Orders() {
  const dispatch = useDispatch()
  const accessToken = getCookie('accessToken');
  useEffect(() => {
    dispatch({
      type: WS_USER_CONNECTION_START,
      payload: `?token=${accessToken}`
    })
    return () => {
      dispatch({type: WS_USER_CONNECTION_STOP})
    }
  }, []);

  const {data} = useSelector(getUserOrders);
  const orders = data && JSON.parse(data);

  const sortedOrders: Array<IFeedOrderItem> = orders?.orders?.sort((orderA: IFeedOrderItem, orderB: IFeedOrderItem) => {
      if (orderA.createdAt < orderB.createdAt) {
        return 1
      }
      if (orderA.createdAt === orderB.createdAt) {
        return 0
      }
      if (orderA.createdAt > orderB.createdAt) {
        return -1
      }
    }
  )

  return (
    <main className={style.orders}>
      <ProfileNavMenu/>
      <ul className={`${style.orderList} mt-10`}>
        {
          sortedOrders?.map((order) => (
            <OrderItem key={order._id} order={order}/>
          ))}
      </ul>
    </main>
  )
}

export default Orders;


