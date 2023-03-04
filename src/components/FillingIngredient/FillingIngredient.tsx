import React, {FC} from 'react';
import style from './FillingIngredient.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {delIngredient, sortIngredient} from "../../services/actions/ingredients";
import {useDrop, useDrag} from 'react-dnd';
import {IIngredient} from "../../utils/types";
import {useDispatch} from "../../services/hooks";

const FillingIngredient: FC<{ element: IIngredient }> = ({element}) => {
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
    collect: (monitor: any) => ((monitor.getItem())?.id),
    drop() {
      if (dragElementId && element.id && element.id !== dragElementId) {
        dispatch(sortIngredient(dragElementId, element.id));
      }
    }
  });

  function handleDelElement(element: IIngredient) {
    dispatch(delIngredient(element))
  }

  return isDrag ? null : (
    <li key={element.id} className={style.fillingItem}
        ref={(itemRef) => (element.type !== 'bun' ? dragRef(dropRef(itemRef)) : {})}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => handleDelElement(element)}
      />
    </li>)
}

export default FillingIngredient;



