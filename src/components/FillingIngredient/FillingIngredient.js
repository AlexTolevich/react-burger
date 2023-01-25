import React from 'react';
import style from './FillingIngredient.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {DEL_INGREDIENT, SORT_INGREDIENTS} from "../../services/actions";
import {useDrop, useDrag} from 'react-dnd';
import PropTypes from 'prop-types';
import {ingredientsType} from "../../utils/ingredientsType";


function FillingIngredient({element}) {
  const dispatch = useDispatch();

  const [{isDrag}, dragRef] = useDrag({
    type: 'filling',
    item: element,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [dragElementId, dropRef] = useDrop({
    accept: 'filling',
    collect: (monitor) => ((monitor.getItem())?.id),
    drop() {
      if (dragElementId && element.id && element.id !== dragElementId) {
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
    !isDrag &&
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



