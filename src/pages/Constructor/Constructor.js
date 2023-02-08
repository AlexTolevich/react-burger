import React from 'react';
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import style from "./Constructor.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function Constructor() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={style.container}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </DndProvider>
    </>
  )
}

export default Constructor;


