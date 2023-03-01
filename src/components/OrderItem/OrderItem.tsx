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

  const orderIngredients = order.order.ingredients.map(ingredientId => {
    return ingredients.find(item => item._id === ingredientId)
  });

  console.log(orderIngredients)
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
        <ul className={`${style.ingredientList}`}>
          {orderIngredients?.slice(0, 6).map((ingredient, index) => (
            <li
              key={ingredient?._id + index.toString()}
              className={`${style.icon}`}
              style={{
                backgroundImage: `url(${ingredient?.image_mobile})`,
                zIndex: 6 - index,
              }}
            >
              {orderIngredients?.length > 6 && index === 5 ? (
                <div className={''}>
                  <p className={`text text_type_main-default`}>
                    +{orderIngredients?.length - 5}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </li>
    </Link>
  )
}