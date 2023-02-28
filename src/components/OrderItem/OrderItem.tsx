import React, {FC} from "react"
import {Link, useLocation} from "react-router-dom";
import {IFeedOrderItem} from "../../utils/types";
import {useSelector} from "../../services/hooks";
import {getIngredientsFromStore} from "../../services/constants/selectors";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./OrderItem.module.css"

export const OrderItem: FC<{ order: IFeedOrderItem }> = (order) => {
  const location = useLocation();
  const {ingredients} = useSelector(getIngredientsFromStore);

  return (
    <Link to={`/feed/${order.order._id}`}
          state={{backgroundLocation: location}}
    >
      <li className={style.order}>
        <div className={style.numberCover}>
          <p className={`text text_type_digits-default`}>
            #{order.order.number}
          </p>
          <FormattedDate date={new Date(order.order.createdAt)}/>
        </div>
        <h4 className={`${style.title} text text_type_main-medium mt-6`}>
          {order.order.name}
        </h4>
      </li>
    </Link>
  )
}