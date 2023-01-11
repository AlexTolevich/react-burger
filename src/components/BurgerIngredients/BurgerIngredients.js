import React, {useEffect, useState, useRef, useCallback} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useSelector, useDispatch} from 'react-redux';
import {
  ADD_INGREDIENT,
  ADD_VIEWED_INGREDIENT,
  DEL_VIEWED_INGREDIENT,
  getIngredients,
  SET_ACTIVE_TAB
} from "../../services/actions";

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
  const [categories, setCategories] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const selectedIngredient = useSelector(state => state.viewedIngredient.ingredient);
  const {ingredients, activeTab} = useSelector(state => state.ingredients);

  const refContainerIngredients = useRef(null);
  const refArray = useRef([]);
  const addToRefs = useCallback((element, index) => {
    if (!element || refArray.current.includes(element)) return;
    refArray.current.splice(index, 0, element);
  }, []);

  const dispatch = useDispatch();

  function handleBurger(ingredient) {
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: ingredient
    });
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
      const newCategories = [...new Set(ingredients?.map(item => item.type))];
      setCategories(newCategories);
    },
    [ingredients]
  );

  function handleClick(ingredient) {
    dispatch({
      type: ADD_VIEWED_INGREDIENT,
      ingredient: ingredient
    })
    setIsOpenModal(true);
  }

  function onClose() {
    setIsOpenModal(false);
    dispatch({type: DEL_VIEWED_INGREDIENT});
  }

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
                    <li key={ingredient._id} className={style.ingredient} onClick={() => {
                      handleClick(ingredient);
                      handleBurger(ingredient)
                    }}>
                      <Counter count={3} size="default"/>
                      <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4'/>
                      <div className={`${style.price} mt-2 mb-2`}>
                        <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                        <CurrencyIcon type='primary'/>
                      </div>
                      <div>
                        <h4 className={'text text_type_main-default'}>{ingredient.name}</h4>
                      </div>
                    </li>
                  ))}
              </ul>
            </li>
          )
        )}
      </ul>
      {isOpenModal && <Modal onClose={onClose} title="Детали ингредиента">
        <IngredientDetails ingredient={selectedIngredient}/>
      </Modal>}
    </section>
  )
}

export default BurgerIngredients;
