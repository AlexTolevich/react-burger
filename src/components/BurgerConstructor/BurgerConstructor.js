import React, {useEffect, useState} from 'react';
import style from './BurgerConstructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useSelector, useDispatch} from "react-redux";
import {ADD_INGREDIENT} from "../../services/actions/ingredients";
import {useDrop} from 'react-dnd';
import FillingIngredient from "../FillingIngredient/FillingIngredient";
import {getBurger, getLoggedIn} from "../../services/selectors/selectors";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {CLOSE_ORDER, submitOrder} from "../../services/actions/order";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const burger = useSelector(getBurger);
  const loggedIn = useSelector(getLoggedIn);
  const navigate = useNavigate();
  const [bun, setBun] = useState([]);
  const [filling, setFilling] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const ingredients = burger.map(ingredient => ingredient._id);

  useEffect(() => {
    setBun(burger.filter((item) => item.type === 'bun'));
    setFilling(burger.filter(({type}) => type === 'sauce' || type === 'main'));
  }, [burger])

  function calcTotalAmount() {
    const amountFilling = filling.reduce((sum, i) => sum + i.price, 0);
    return (bun.length ? bun[0]?.price * 2 : 0) + amountFilling;
  }

  function handleSubmit() {
    if (loggedIn) {
      dispatch(submitOrder({ingredients}));
      setIsOpenModal(true);
    } else {
      navigate('/login');

    }
  }

  function onClose() {
    setIsOpenModal(false);
    dispatch({type: CLOSE_ORDER});
  }

  function handleBurger(ingredient) {
    ingredient.id = uuidv4();
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: ingredient
    });
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      handleBurger(ingredient);
    }
  });

  return (
    <section className={`${style.constructor} ${isHover && style.hover}`} aria-label="Конструктор бургера"
             ref={dropTarget}>
      {burger.length ?
        (<div className={style.container}>
          <div className={style.ingredients}>
            {bun.length ?
              (<div className="mr-4 pl-8">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun[0]?.name} (верх)`}
                  price={bun[0]?.price}
                  thumbnail={bun[0]?.image}
                />
              </div>) :
              <p className="text text_type_main-default">Кажется ты забыл выбрать булки</p>
            }
            {filling.length ?
              (<ul className={style.fillingList}>
                  {filling?.map((element, i) => (
                    <FillingIngredient key={element.id} element={element}/>
                  ))}
                </ul>
              ) :
              <p className="text text_type_main-default">Незабудь добавить начинку</p>
            }
            {bun.length ?
              (<div className="mr-4 pl-8">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun[0]?.name} (низ)`}
                  price={bun[0]?.price}
                  thumbnail={bun[0]?.image}
                />
              </div>) :
              <p className="text text_type_main-default">Кажется ты забыл выбрать булки</p>
            }
          </div>
          <div className={`${style.order} mt-10 mr-4`}>
            <div className={`${style.priceContainer} mr-10`}>
              <p className="text text_type_digits-medium mr-2">{calcTotalAmount()}</p>
              <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={handleSubmit} htmlType="button">
              Оформить заказ
            </Button>

          </div>

        </div>)
        :
        <p className="text text_type_main-default">Для создания своего идеального бургера, перетащи сюда
          понравившиеся ингредиенты</p>
      }
      {isOpenModal && <Modal onClose={onClose}><OrderDetails/></Modal>}
    </section>
  )
}

export default BurgerConstructor;

