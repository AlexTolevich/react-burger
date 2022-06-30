import style from './AppHeader.module.css';
import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom';


function AppHeader() {
  const path = useLocation();
  return (
    <header className={`${style.header} pt-4 pb-4`}>
      <nav className={style.nav}>
        <div className={style.container}>
          <Link to="/"
                className={`${style.link} ${style.link_is_active} pl-5 pr-5`}>
            <BurgerIcon type="primary"/>
            {/*Удалить строки 14,15 и снять коментарии с 17,18 после вёрстки всех старниц и настройки роутинга*/}
            {/*   className={`${style.link} ${path.pathname === '/constructor' && style.link_is_active} pl-5 pr-5`}>*/}
            {/*<BurgerIcon type={path.pathname === '/constructor' ? "primary" : "secondary"}/>*/}
            <p className="ml-2 text text_type_main-default">Конструктор</p>
          </Link>
          <Link to="/"
                className={`${style.link} ${path.pathname === '/order' && style.link_is_active} pl-5 pr-5`}>
            <ListIcon type={path.pathname === '/order' ? "primary" : "secondary"}/>
            <p className="ml-2 text text_type_main-default">Лента заказов</p>
          </Link>
        </div>
        <Link to="/" className={`${style.logo}`}>
          <Logo/>
        </Link>
        <div className={`${style.container} ${style.container_from_right}`}>
          <Link to="/"
                className={`${style.link} ${path.pathname === '/profile' && style.link_is_active} pl-5 pr-5`}>
            <ProfileIcon type={path.pathname === '/profile' ? "primary" : "secondary"}/>
            <p className="ml-2 text text_type_main-default">Личный кабинет</p>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader;