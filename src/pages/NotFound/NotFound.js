import React from 'react';
import style from './NotFound.module.css';
import {useNavigate} from 'react-router-dom';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

function NotFound() {
  const navigate = useNavigate();
  return (
    <main className={style.notfound}>
      <h1 className={style.header}>404</h1>
      <p className={style.text}>Страница не найдена</p>
      <Button onClick={()=> navigate(-1)} htmlType="button" type="primary" size="medium">Назад</Button>
    </main>
  )
}

export default NotFound;