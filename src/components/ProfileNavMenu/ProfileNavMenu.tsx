import React from 'react';
import style from './ProfileNavMenu.module.css';

import {NavLink, useLocation, useNavigate,} from 'react-router-dom';
import {onLogout} from "../../services/actions/user";
import {useDispatch} from "../../services/hooks";


function ProfileNavMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshToken = localStorage.getItem('refreshToken');
  const classNavLink = (isActive: { isActive: boolean }) => `${style.link} text text_type_main-medium ` + (isActive?.isActive && style.link_active);

  function handleExitUser() {
    dispatch(onLogout(refreshToken,
      () => navigate('/login', {replace: true, state: {from: location}})));
  }

  return (
    <section className={`${style.container} pt-30`}>
      <div className={`${style.navContainer} ml-5`}>
        <nav className={style.nav}>
          <NavLink
            to="/profile"
            end
            className={classNavLink}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            end
            className={classNavLink}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/"
            end
            className={classNavLink}
            onClick={handleExitUser}
          >
            Выход
          </NavLink>
        </nav>
        {location.pathname.includes("orders")
          ? <p className={`${style.text} text text_type_main-default mt-20`}>
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
          : <p className={`${style.text} text text_type_main-default mt-20`}>
            В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
          </p>}
      </div>
    </section>
  )
}

export default ProfileNavMenu;


