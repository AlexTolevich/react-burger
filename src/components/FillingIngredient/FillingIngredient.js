import React, {useEffect, useState} from 'react';
import style from './FillingIngredient.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from "react-redux";
import {DEL_INGREDIENT, SORT_INGREDIENTS} from "../../services/actions";
import {useDrop, useDrag} from 'react-dnd';
import PropTypes from 'prop-types';
import {ingredientsType} from "../../utils/ingredientsType";


function FillingIngredient({element}) {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'filling',
    item: element
  });
  const [dragElementId, dropRef] = useDrop({
    accept: 'filling',
    collect: (monitor) => ((monitor.getItem())?.id),
    hover() {
      if (dragElementId && element.id && element.id !== dragElementId) {
        // console.log(element.id)
        // console.log(dragElementId)
        dispatch({
          type: SORT_INGREDIENTS,
          dragElementId: dragElementId,
          dropElementId: element.id
        });
      }
    }
  });

  function handleDelElement(element) {
    dispatch({
      type: DEL_INGREDIENT,
      ingredient: element
    })
  }

  return (
    <li key={element.id} className={style.fillingItem}
        ref={(itemRef) => (element.type !== 'bun' ? dragRef(dropRef(itemRef)) : {})}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => handleDelElement(element)}
      />
    </li>
  )
}

FillingIngredient.propTypes = {
  element: PropTypes.shape(ingredientsType).isRequired
}
export default FillingIngredient;



