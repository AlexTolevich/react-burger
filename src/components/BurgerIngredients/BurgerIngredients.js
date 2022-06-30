import React, {useEffect, useState} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {v4 as uuidv4} from 'uuid';
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {ingredientsType} from "../../utils/ingredientsType";
import PropTypes from "prop-types";

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

function BurgerIngredients({ingredients, burger, setBurger}) {
  const [current, setCurrent] = useState('bun')
  const [categories, setCategories] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  function handleBurger(ingredient) {
    if (ingredient.type === 'bun') {
      setBurger(state =>
        state.filter(item => item.type === 'bun' ? null : item)
      );
      setBurger(state => [...state, {...ingredient, id: uuidv4()}]);
    } else {
      setBurger([...burger, {...ingredient, id: uuidv4()}]);
    }
  }

  useEffect(() => {
      const newCategories = [...new Set(ingredients?.map(item => item.type))]
      setCategories(newCategories)
    },
    [ingredients]
  );

  function handleClick(ingredient) {
    setSelectedIngredient(ingredient);
    setIsOpenModal(true);
  }

  function onClose() {
    setIsOpenModal(false);
    setSelectedIngredient(null);
  }

  return (
    <section className={style.ingredients}>
      <h2 className={`${style.header} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <ul className={`${style.list} ${style.tabs}`}>
        {TABS.map((tab, i) => (
            <li key={tab.id} className={style.item}>
              <Tab value={tab.type} active={current === tab.type} onClick={setCurrent}>{tab.title}</Tab>
            </li>
          )
        )}
      </ul>
      <ul className={`${style.list} ${style.categoryList}`}>
        {categories.map((cat, i) => (
            <li key={i} className={`${style.item} ${style.category} pt-10 pb-6`}>
              <h3
                className="text text_type_main-medium mb-6">{(cat === "bun") ? "Булки" : (cat === "sauce") ? "Соусы" : cat === "main" ? "Начинки" : cat}</h3>
              <ul className={`${style.list} ${style.ingredientList} ml-4 mr-4`}>
                {ingredients?.filter(({type}) => type === cat)
                  .map((ingredient, i) => (
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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientsType)).isRequired,
  setBurger: PropTypes.func.isRequired,
  burger: PropTypes.arrayOf(PropTypes.shape(ingredientsType)).isRequired
}

export default BurgerIngredients;
