import React, {FC} from "react";
import {testWsData} from "../../utils/FeedData";
import style from './Feed.module.css'
import {IFeedOrderItem} from "../../utils/types";
import {OrderItem} from "../../components/OrderItem/OrderItem";

export const Feed: FC = () => {

  return (
    <section>
      <h2
        className={'mt-10 mb-5 text text_type_main-large'}>
        Лента заказов
      </h2>
      <ul className={`${style.list}`}>
        {
          testWsData.orders.map((order: IFeedOrderItem) => (
          <OrderItem key={order._id} order={order}/>
        ))}
      </ul>
    </section>)
}