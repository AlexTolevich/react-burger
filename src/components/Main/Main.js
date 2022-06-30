import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./Main.module.css";
import {ingredientsType} from "../../utils/ingredientsType";
import PropTypes from "prop-types";

function Main({ingredients}) {
  const [burger, setBurger] = React.useState([]);

  return (
    <>
      <AppHeader/>
      <main className={style.container}>
        <BurgerIngredients ingredients={ingredients} burger={burger} setBurger={setBurger}/>
        <BurgerConstructor burger={burger}/>
      </main>
    </>
  )
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientsType)).isRequired
}

export default Main;


