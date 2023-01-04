import React, {useEffect, useState} from 'react';
import style from './BurgerConstructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useSelector, useDispatch} from "react-redux";
import {DEL_INGREDIENT, submitOrder} from "../../services/actions";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const burger = useSelector(state => state.burgerConstructor.burger);
  const orderId = useSelector(state => state.order.order);
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
    dispatch(submitOrder({ingredients}))
    setIsOpenModal(true);
  }

  function onClose() {
    setIsOpenModal(false);
  }

  function handleDelElement(element) {
    dispatch({
      type: DEL_INGREDIENT,
      ingredient: element
    })
  }

  return (
    <section className={style.constructor} aria-label="Конструктор бургера">
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
                    <li key={element.id} className={style.fillingItem}>
                      <DragIcon type="primary"/>
                      <ConstructorElement
                        text={element.name}
                        price={element.price}
                        thumbnail={element.image}
                        handleClose={() => handleDelElement(element)}
                      />
                    </li>
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
        <p className="text text_type_main-default">Для создания своего идеального бургера, кликните по
          понравившемся ингредиентам</p>
      }
      {isOpenModal && <Modal onClose={onClose}><OrderDetails orderId={orderId}/></Modal>}
    </section>
  )
}

export default BurgerConstructor;

