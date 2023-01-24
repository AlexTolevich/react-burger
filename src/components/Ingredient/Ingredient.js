import React, {useState} from 'react';
import PropTypes from "prop-types";
import style from './Ingredient.module.css'
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useSelector, useDispatch} from 'react-redux';
import {
  ADD_VIEWED_INGREDIENT,
  DEL_VIEWED_INGREDIENT,
} from "../../services/actions";
import {useDrag} from 'react-dnd';
import {ingredientsType} from "../../utils/ingredientsType";
import {getBurger, getViewedIngredient} from "../../services/selectors/selectors";

function Ingredient({ingredient}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const selectedIngredient = useSelector(getViewedIngredient);
  const burger = useSelector(getBurger);
  const count = burger.filter(item => item._id === ingredient._id).length;

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();

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


  return (
    <>
      <li ref={dragRef} className={`${style.ingredient} ${isDrag && style.isDrag}`} onClick={() => {
        handleClick(ingredient)
      }}>
        {count ? <Counter count={ingredient.type === 'bun' ? count * 2 : count} size="default"/> : null}
        <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4'/>
        <div className={`${style.price} mt-2 mb-2`}>
          <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
          <CurrencyIcon type='primary'/>
        </div>
        <div>
          <h4 className={'text text_type_main-default'}>{ingredient.name}</h4>
        </div>
      </li>

      {
        isOpenModal && <Modal onClose={onClose} title="Детали ингредиента">
          <IngredientDetails ingredient={selectedIngredient}/>
        </Modal>
      }
    </>
  )
}

export default Ingredient;

Ingredient.propTypes = {
  ingredient: PropTypes.shape(ingredientsType).isRequired
}
