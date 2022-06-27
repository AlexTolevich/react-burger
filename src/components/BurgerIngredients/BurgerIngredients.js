import React, {useEffect} from 'react';
import ingredientsStyle from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

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

// eslint-disable-next-line react/prop-types
function BurgerIngredients({ingredients}) {

  const [current, setCurrent] = React.useState('bun')
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
      // eslint-disable-next-line react/prop-types
      const newCategories = [...new Set(ingredients.data?.map(item => item.type))]
      setCategories(newCategories)
    },
    [ingredients]
  );

  return (
    <section className={ingredientsStyle.ingredients}>
      <h2 className={`${ingredientsStyle.header} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <ul className={`${ingredientsStyle.list} ${ingredientsStyle.tabs}`}>
        {TABS.map((tab, i) => (
            <li key={tab.id} className={ingredientsStyle.item}>
              <Tab value={tab.type} active={current === tab.type} onClick={setCurrent}>{tab.title}</Tab>
            </li>
          )
        )}
      </ul>
      <ul className={`${ingredientsStyle.list} ${ingredientsStyle.categoryList}`}>
        {categories.map((cat, i) => (
            <li key={i} className={`${ingredientsStyle.item} ${ingredientsStyle.category} pt-10 pb-6`}>
              <h3
                className="text text_type_main-medium mb-6">{(cat === "bun") ? "Булки" : (cat === "sauce") ? "Соусы" : cat === "main" ? "Начинки" : cat}</h3>
              <ul className={`${ingredientsStyle.list} ${ingredientsStyle.ingredientList} ml-4 mr-4`}>
                {/* eslint-disable-next-line react/prop-types */}
                {ingredients.data?.filter(({type}) => type === cat)
                  .map((ingredient, i) => (
                    <li key={ingredient._id} className={ingredientsStyle.ingredient}>
                      <Counter count={3} size="default"/>
                      <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4'/>
                      <div className={`${ingredientsStyle.price} mt-2 mb-2`}>
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

    </section>
  )
}

export default BurgerIngredients;