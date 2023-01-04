import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./Main.module.css";

function Main() {
  return (
    <>
      <AppHeader/>
      <main className={style.container}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </>
  )
}

export default Main;


