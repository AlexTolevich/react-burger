import React from 'react';
import style from "./OrderInfoPage.module.css";
import OrderInfo from "../../components/OrderInfo/OrderInfo";

function OrderInfoPage() {
  return (
    <section className={style.container}>
      <OrderInfo/>
    </section>
  )
}

export default OrderInfoPage;
