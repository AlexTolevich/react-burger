import React, {FC} from "react";
import style from "./OrderInfo.module.css";
import {useParams} from "react-router-dom";
import {getIngredientsFromStore} from "../../services/constants/selectors";
import {useSelector} from "../../services/hooks";
import {IFeedOrderItem, IIngredient} from "../../utils/types";
import {testWsData} from "../../utils/FeedData";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {calculateOrderAmount} from "../../utils/calculateOrderAmount";

const OrderInfo: FC = () => {
  const {id} = useParams();
  const {ingredients} = useSelector(getIngredientsFromStore);

  const currentOrder = testWsData.orders.find((order: IFeedOrderItem) => order._id === id)!;

  const uniqueIngredientList = [...new Set(currentOrder?.ingredients)];

  const orderIngredients: IIngredient[] = [];
  if (currentOrder) {
    currentOrder.ingredients.forEach(ingredientId => {
      const item = ingredients.find(ingredient => ingredient._id === ingredientId);
      if (item) orderIngredients.push(item);
    })
  }

  const groupedIngredients: Array<IIngredient[]> = []
  if (uniqueIngredientList) {
    uniqueIngredientList?.forEach(ingredientId => {
      const items = orderIngredients?.filter((item: IIngredient) => item._id === ingredientId);
      if (items) groupedIngredients.push(items);
    });
  }

  return (
    <div className={style.orderInfo}>
      <p className={`${style.number} text text_type_digits-default mb-10`}>
        #{currentOrder?.number}
      </p>
      <h4 className={`text text_type_main-medium mb-3`}>
        {currentOrder?.name}
      </h4>
      <p className={`${style.orderStatus} ${
        currentOrder?.status === 'done'
          ? style.orderStatusDone
          : currentOrder?.status === 'pending' || currentOrder?.status === 'created'
            ? style.orderStatusCreated
            : style.orderStatusCanceled
      } text text_type_main-default mb-15`}
      >
        {currentOrder?.status === 'done'
          ? 'Выполнен'
          : currentOrder?.status === 'pending'
            ? 'Готовится'
            : currentOrder?.status === 'created'
              ? 'Создан'
              : 'Отменён'}
      </p>
      <p className={`text text_type_main-medium mb-6`}>
        Состав:
      </p>
      <ul className={`${style.list}`}>
        {groupedIngredients.map((ingredient, index) => (
          <li
            key={ingredient[0]?._id}
            className={style.ingredient}
          >
            <div className={style.ingredientContainer}>
              <div
                className={`${style.icon}`}
                style={{
                  backgroundImage: `url(${ingredient[0]?.image_mobile})`
                }}
              />
              <h5 className={`text text_type_main-default`}>
                {ingredient[0]?.name}
              </h5>
            </div>
            <div className={`${style.priceContainer}`}>
              <p className={`text text_type_digits-default mr-2`}>
                {ingredient[0]?.type === 'bun' ? ingredient?.length * 2 : ingredient?.length} x {ingredient[0]?.price}
              </p>
              <CurrencyIcon type="primary"/>
            </div>
          </li>
        ))}
      </ul>
      <div className={`${style.infoContainer}`}>
        <FormattedDate className={`text_color_inactive`}
                       date={new Date(currentOrder?.createdAt)}/>
        <div className={`${style.priceContainer} ml-2`}>
          <p className={`text text_type_digits-default mr-2`}>
            {calculateOrderAmount(orderIngredients)}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo;