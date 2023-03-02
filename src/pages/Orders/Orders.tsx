import React from 'react';
import style from './Orders.module.css';
import ProfileNavMenu from "../../components/ProfileNavMenu/ProfileNavMenu";
import {testWsData} from "../../utils/FeedData";
import {IFeedOrderItem} from "../../utils/types";
import {OrderItem} from "../../components/OrderItem/OrderItem";

function Orders() {
  return (
    <main className={style.orders}>
      <ProfileNavMenu/>
      <ul className={`${style.orderList} mt-10`}>
        {
          testWsData.orders.map((order: IFeedOrderItem) => (
            <OrderItem key={order._id} order={order}/>
          ))}
      </ul>
    </main>
  )
}

export default Orders;


