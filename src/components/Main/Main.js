import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./Main.module.css";

function Main() {
  const [burger, setBurger] = React.useState([]);

  return (
    <>
      <AppHeader/>
      <main className={style.container}>
        <BurgerIngredients
          burger={burger} setBurger={setBurger}/>
        <BurgerConstructor burger={burger}/>
      </main>
    </>
  )
}

export default Main;


