import React, {useEffect, useState, useRef, useCallback} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from 'react-redux';
import {
  getIngredients,
  SET_ACTIVE_TAB
} from "../../services/actions";
import Ingredient from "../Ingredient/Ingredient";

const TABS = [
  {
    id: '001',
    type: 'bun',
    title: 'Булки'
  },
  {
    id: '002',
    type: 'sauce',
    title: 'Соусы'
  },
  {
    id: '003',
    type: 'main',
    title: 'Начинки'
  }
];

function BurgerIngredients() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const {ingredients, activeTab} = useSelector(state => state.ingredients);

  const refContainerIngredients = useRef(null);
  const refArray = useRef([]);
  const addToRefs = useCallback((element, index) => {
    if (!element || refArray.current.includes(element)) return;
    refArray.current.splice(index, 0, element);
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
      const newCategories = [...new Set(ingredients?.map(item => item.type))];
      setCategories(newCategories);
    },
    [ingredients]
  );

  function handleTabClick(tab) {
    dispatch({type: SET_ACTIVE_TAB, value: tab.type});
    const idTab = refArray.current?.findIndex(item => item.id === tab.type);
    refArray.current?.[idTab]?.scrollIntoView();
  }

  function handleScroll() {
    const newViewCategory = refArray.current?.map(item => {
      const obj = {}
      obj.type = item.id;
      obj.distance = Math.abs(refContainerIngredients.current?.getBoundingClientRect()?.top - item.getBoundingClientRect()?.top)
      return obj;
    });
    const minDistanceObj = newViewCategory.reduce((a, b) => a.distance < b.distance ? a : b)
    dispatch({type: SET_ACTIVE_TAB, value: minDistanceObj.type});
  }

  return (
    <section className={style.ingredients}>
      <h2 className={`${style.header} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <ul className={`${style.list} ${style.tabs}`}>
        {TABS.map((tab) => (
            <li key={tab.id} className={style.item}>
              <Tab value={tab.type} active={activeTab === tab.type}
                   onClick={() => handleTabClick(tab)}
              >{tab.title}</Tab>
            </li>
          )
        )}
      </ul>
      <ul className={`${style.list} ${style.categoryList}`} ref={refContainerIngredients} onScroll={handleScroll}>
        {categories.map((cat, i) => (
            <li key={i} className={`${style.item} ${style.category} pt-10 pb-6`}
                ref={(element) => {
                  addToRefs(element, i)
                }} id={cat}>
              <h3
                className="text text_type_main-medium mb-6">{(cat === "bun") ? "Булки" : (cat === "sauce") ? "Соусы" : cat === "main" ? "Начинки" : cat}</h3>
              <ul className={`${style.list} ${style.ingredientList} ml-4 mr-4`}>
                {ingredients?.filter(({type}) => type === cat)
                  .map((ingredient) => (
                    <Ingredient ingredient={ingredient} key={ingredient._id}/>
                  ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </section>
  )
}

export default BurgerIngredients;
