import React, {FC, useEffect} from "react";
import style from './Feed.module.css'
import {IFeedOrderItem} from "../../utils/types";
import {OrderItem} from "../../components/OrderItem/OrderItem";
import {WS_CONNECTION_START, WS_CONNECTION_STOP} from "../../services/constants/wsAction";
import {useDispatch, useSelector} from "../../services/hooks";
import {getOrders} from "../../services/constants/selectors";

export const Feed: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START})
    return () => {
      dispatch({type: WS_CONNECTION_STOP})
    }
  }, []);

  const {data} = useSelector(getOrders);
  const parsedData = data && JSON.parse(data);
  const orders: Array<IFeedOrderItem>  = parsedData.orders;

  return (
    <main className={style.feed}>
      <section className={style.orderFeed}>
        <h2
          className={`mt-10 mb-5 text text_type_main-large`}>
          Лента заказов
        </h2>
        <ul className={`${style.orderList}`}>
          {
            orders?.map((order) => (
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
                {orders?.filter((order) => order.status === 'done')
                  .slice(0, 10)
                  .map((order) => (
                    <li className={`${style.order} ${style.orderStatusDone} text text_type_digits-default mb-2`}
                        key={order._id}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
              {orders?.length > 10 && (
                <ul className={`${style.orders}`}>
                  {orders?.filter((order) => order.status === 'done')
                    .slice(11, 21)
                    .map((order) => (
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
                {orders?.filter((order) => order.status === 'pending')
                  .slice(0, 10)
                  .map((order) => (
                    <li className={`${style.order} text text_type_digits-default mb-2`}
                        key={order._id}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
              {orders?.length > 10 && (
                <ul className={`${style.orders}`}>
                  {orders?.filter((order) => order.status === 'pending')
                    .slice(11, 21)
                    .map((order) => (
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
          {parsedData?.total}
        </p>
        <p className={`text text_type_main-medium mt-15`}>
          Выполнено за сегодня:
        </p>
        <p className={`${style.count} text text_type_digits-large`}>
          {parsedData?.totalToday}
        </p>
      </section>
    </main>)
}