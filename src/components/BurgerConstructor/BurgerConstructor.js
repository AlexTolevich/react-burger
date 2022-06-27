import React from 'react';
import ingredientsStyle from "../BurgerIngredients/BurgerIngredients.module.css";

function BurgerContructor() {
  return (
    <h2 className={`${ingredientsStyle.header} text text_type_main-large`}>Соберите бургер</h2>
  )
}

export default BurgerContructor;