import React from "react";
import style from "./OrderDetails.module.css";
import done from "../../images/done.svg"
import PropTypes from 'prop-types';

function OrderDetails({orderId}) {
  return (
    <div className={`${style.order} pt-5 pb-15`}>
      <h2 className="text text_type_digits-large">
        {orderId}
      </h2>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img
        className={style.image} src={done} alt="Заказ прошел успешно"
      />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p
        className={`${style.darkText} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired
}

export default OrderDetails;

