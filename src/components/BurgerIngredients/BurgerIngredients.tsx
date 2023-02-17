import React, {useEffect, useState, useRef, useCallback} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from 'react-redux';
import {setActiveTab} from "../../services/actions/ingredients";
import Ingredient from "../Ingredient/Ingredient";
import {getIngredientsFromStore} from "../../services/selectors/selectors";
import Preloader from "../Preloader/Preloader";
import {IIngredient, ITab, TDispatch} from "../../utils/types";

interface IObj {
  [name: string]: any,
}

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
  const dispatch = useDispatch<TDispatch>();
  const [categories, setCategories] = useState<Array<string>>([]);
  const {ingredients, activeTab, ingredientsRequest} = useSelector(getIngredientsFromStore);
  const refContainerIngredients = useRef<HTMLUListElement>(null);
  const refArray = useRef<Array<HTMLLIElement>>([]);
  const addToRefs = useCallback((element: HTMLLIElement | undefined, index: number) => {
    if (!element || refArray.current.includes(element)) return;
    refArray.current.splice(index, 0, element);
  }, []);

  useEffect(() => {

      const newCategories = ingredients ? [...new Set(ingredients?.map((item: IIngredient) => item.type))] : [];
      setCategories(newCategories);
    },
    [ingredients]
  );

  function handleTabClick(tab: ITab) {
    dispatch(setActiveTab(tab.type));
    const idTab = refArray.current?.findIndex(item => item.id === tab.type);
    refArray.current?.[idTab]?.scrollIntoView();
  }

  function handleScroll() {
    const newViewCategory = refArray.current?.map(item => {
      const obj: IObj = {}
      obj.type = item.id;
      // @ts-ignore
      obj.distance = Math.abs(refContainerIngredients.current?.getBoundingClientRect()?.top - item.getBoundingClientRect()?.top)
      return obj;
    });

    const minDistanceObj = newViewCategory.reduce((a, b) => a.distance < b.distance ? a : b)

    dispatch(setActiveTab(minDistanceObj.type));
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
      {ingredientsRequest ?
        <Preloader/> :
        <ul className={`${style.list} ${style.categoryList}`} ref={refContainerIngredients} onScroll={handleScroll}>
          {categories.map((cat, i) => (
              <li key={i} className={`${style.item} ${style.category} pt-10 pb-6`}
                  ref={(element: HTMLLIElement) => {
                    addToRefs(element, i)
                  }} id={cat}>
                <h3
                  className="text text_type_main-medium mb-6">{(cat === "bun") ? "Булки" : (cat === "sauce") ? "Соусы" : cat === "main" ? "Начинки" : cat}</h3>
                <ul className={`${style.list} ${style.ingredientList} ml-4 mr-4`}>
                  {ingredients?.filter(({type}: IIngredient) => type === cat)
                    .map((ingredient: IIngredient) => (
                      <Ingredient ingredient={ingredient} key={ingredient._id}/>
                    ))}
                </ul>
              </li>
            )
          )}
        </ul>
      }
    </section>
  )
}

export default BurgerIngredients;
