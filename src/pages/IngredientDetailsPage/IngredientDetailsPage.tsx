import React from 'react';
import style from "./IngredientDetailsPage.module.css";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

function IngredientDetailsPage() {
  return (
    <section className={style.container}>
      <h2 className={`text text_type_main-large pb-4`}>
        {"Детали ингредиента"}
      </h2>
      <IngredientDetails/>
    </section>
  )
}

export default IngredientDetailsPage;


