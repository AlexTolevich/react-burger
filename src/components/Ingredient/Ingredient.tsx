import React, {FC} from 'react';
import style from './Ingredient.module.css'
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';
import {getBurger} from "../../services/selectors/selectors";
import {Link, useLocation} from "react-router-dom";
import {IIngredient} from "../../utils/types";

const Ingredient: FC<{ ingredient: IIngredient }> = ({ingredient}) => {
  const burger = useSelector(getBurger);
  const location = useLocation();
  const count = burger.filter((item: { _id: string; }) => item._id === ingredient._id).length;

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <>
      <Link ref={dragRef} className={`${style.ingredient} ${isDrag && style.isDrag}`}
            to={`/ingredients/${ingredient._id}`}
            state={{backgroundLocation: location}}>
        <li className={style.item}>
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
      </Link>
    </>
  )
}

export default Ingredient;

