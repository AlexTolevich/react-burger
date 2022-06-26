import headerStyle from './AppHeader.module.css';
import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom';


function AppHeader() {
  const path = useLocation();
  return (
    <header className={`${headerStyle.header} pt-4 pb-4`}>
      <nav className={headerStyle.nav}>
        <div className={headerStyle.container}>
          <Link to="/"
                className={`${headerStyle.link} ${headerStyle.link_is_active} pl-5 pr-5`}>
            <BurgerIcon type="primary"/>
            {/*Удалить строки 14,15 и снять коментарии с 17,18 после вёрстки всех старниц и настройки роутинга*/}
            {/*   className={`${headerStyle.link} ${path.pathname === '/constructor' && headerStyle.link_is_active} pl-5 pr-5`}>*/}
            {/*<BurgerIcon type={path.pathname === '/constructor' ? "primary" : "secondary"}/>*/}
            <p className="ml-2">Конструктор</p>
          </Link>
          <Link to="/"
                className={`${headerStyle.link} ${path.pathname === '/order' && headerStyle.link_is_active} pl-5 pr-5`}>
            <ListIcon type={path.pathname === '/order' ? "primary" : "secondary"}/>
            <p className="ml-2">Лента заказов</p>
          </Link>
        </div>
        <Link to="/" className={`${headerStyle.logo}`}>
          <Logo/>
        </Link>
        <div className={`${headerStyle.container} ${headerStyle.container_from_right}`}>
          <Link to="/"
                className={`${headerStyle.link} ${path.pathname === '/profile' && headerStyle.link_is_active} pl-5 pr-5`}>
            <ProfileIcon type={path.pathname === '/profile' ? "primary" : "secondary"}/>
            <p className="ml-2">Личный кабинет</p>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader