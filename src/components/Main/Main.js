import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./Main.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function Main() {
  return (
    <>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <main className={style.container}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </DndProvider>
    </>
  )
}

export default Main;


