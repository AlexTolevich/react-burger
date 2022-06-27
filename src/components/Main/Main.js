import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import mainStyle from "./Main.module.css";

// eslint-disable-next-line react/prop-types
function Main({ingredients}) {
  return (
    <>
      <AppHeader/>
      <main className={mainStyle.container}>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor/>
      </main>
    </>
  )
}

export default Main