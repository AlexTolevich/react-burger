import React, {FC} from "react";
import {testWsData} from "../../utils/FeedData";
import style from './Feed.module.css'
import {IFeedOrderItem} from "../../utils/types";
import {OrderItem} from "../../components/OrderItem/OrderItem";

export const Feed: FC = () => {

  return (
    <main className={style.feed}>
      <section className={style.orderFeed}>
        <h2
          className={`mt-10 mb-5 text text_type_main-large`}>
          Лента заказов
        </h2>
        <ul className={`${style.orderList}`}>
          {
            testWsData.orders.map((order: IFeedOrderItem) => (
              <OrderItem key={order._id} order={order}/>
            ))}
        </ul>
      </section>
      <section className={`${style.statistics} pt-25 pb-10`}>
        <div className={`${style.coverStatisticOrders}`}>
          <div>
            <p className={`text text_type_main-medium pb-6`}>
              Готовы:
            </p>
            <div className={style.statusList}>
              <ul className={`${style.orders}`}>
                {testWsData.orders.filter((order) => order.status === 'done')
                  .slice(0, 10)
                  .map((order: IFeedOrderItem) => (
                    <li className={`${style.order} ${style.orderStatusDone} text text_type_digits-default mb-2`}
                        key={order._id}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
              {testWsData.orders.length > 10 && (
                <ul className={`${style.orders}`}>
                  {testWsData.orders.filter((order) => order.status === 'done')
                    .slice(11, 21)
                    .map((order: IFeedOrderItem) => (
                      <li className={`${style.order} ${style.orderStatusDone}  text text_type_digits-default mb-2`}
                          key={order._id}
                      >
                        {order.number}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <p className={`text text_type_main-medium pb-6`}>
              В работе:
            </p>
            <div className={style.statusList}>
              <ul className={`${style.orders}`}>
                {testWsData.orders.filter((order) => order.status === 'pending')
                  .slice(0, 10)
                  .map((order: IFeedOrderItem) => (
                    <li className={`${style.order} text text_type_digits-default mb-2`}
                        key={order._id}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
              {testWsData.orders.length > 10 && (
                <ul className={`${style.orders}`}>
                  {testWsData.orders.filter((order) => order.status === 'pending')
                    .slice(11, 21)
                    .map((order: IFeedOrderItem) => (
                      <li className={`${style.order} text text_type_digits-default mb-2`}
                          key={order._id}
                      >
                        {order.number}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <p className={`text text_type_main-medium mt-15`}>
          Выполнено за все время:
        </p>
        <p className={`${style.count} text text_type_digits-large`}>
          {testWsData.total}
        </p>
        <p className={`text text_type_main-medium mt-15`}>
          Выполнено за сегодня:
        </p>
        <p className={`${style.count} text text_type_digits-large`}>
          {testWsData.totalToday}
        </p>
      </section>
    </main>)
}