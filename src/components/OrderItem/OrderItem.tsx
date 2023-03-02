import React, {FC} from "react"
import {Link, useLocation} from "react-router-dom";
import {IFeedOrderItem, IIngredient} from "../../utils/types";
import {useSelector} from "../../services/hooks";
import {getIngredientsFromStore} from "../../services/constants/selectors";
import {FormattedDate, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./OrderItem.module.css"
import {calculateOrderAmount} from "../../utils/calculateOrderAmount";

export const OrderItem: FC<{ order: IFeedOrderItem }> = (order) => {
  const location = useLocation();
  const {ingredients} = useSelector(getIngredientsFromStore);

  const orderIngredients: IIngredient[] = [];
  order.order.ingredients.forEach(ingredientId => {
    const item = ingredients.find(ingredient => ingredient._id === ingredientId);
    if (item) orderIngredients.push(item);
  })

  return (
    <Link className={style.link}
          to={(location.pathname.includes("feed") ?
            `/feed/${order.order._id}` :
            `/profile/orders/${order.order._id}`)}
          state={{backgroundLocation: location}}
    >
      <li className={style.order}>
        <div className={style.numberContainer}>
          <p className={`text text_type_digits-default`}>
            #{order.order.number}
          </p>
          <FormattedDate className={`text_color_inactive`}
                         date={new Date(order.order.createdAt)}/>
        </div>
        <h4 className={`${style.title} text text_type_main-medium mt-6`}>
          {order.order.name}
        </h4>
        {location.pathname.includes("profile") ? (
          <p className={`${style.orderStatus} ${
            order.order.status === 'done'
              ? style.orderStatusDone
              : order.order.status === 'pending' || order.order.status === 'created'
                ? style.orderStatusCreated
                : style.orderStatusCanceled
          } text text_type_main-default mt-2`}
          >
            {order.order.status === 'done'
              ? 'Выполнен'
              : order.order.status === 'pending'
                ? 'Готовится'
                : order.order.status === 'created'
                  ? 'Создан'
                  : 'Отменён'}
          </p>
        ) : null}
        <div className={`${style.orderContainer}  mt-6`}>
          <ul className={style.ingredientList}>
            {orderIngredients?.slice(0, 6).map((ingredient, index) => (
              <li
                key={ingredient?._id + index.toString()}
                className={style.icon}
                style={{
                  backgroundImage: `url(${ingredient?.image_mobile})`,
                  zIndex: 6 - index,
                }}
              >
                {orderIngredients?.length > 6 && index === 5 ? (
                  <div className={style.overlay}>
                    <p className={`text text_type_main-default`}>
                      +{orderIngredients?.length - 5}
                    </p>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <div className={`${style.priceContainer} ml-6`}>
            <p className={`text text_type_digits-default mr-2`}>
              {calculateOrderAmount(orderIngredients)}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </li>
    </Link>
  )
}