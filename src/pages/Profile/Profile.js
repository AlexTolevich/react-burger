import React, {useState, useEffect} from 'react';

import style from './Profile.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, NavLink} from 'react-router-dom';
import {useFormWithValidation} from '../../utils/hooks/useValidation';

function Profile() {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  const classNavLink = (isActive) => `${style.link} text text_type_main-medium ` + (isActive?.isActive && style.link_active);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    const onRegister = {
      name: values.name,
      email: values.email,
      password: values.password
    };
    console.log(onRegister)
  }

  return (
    <section className={style.container}>
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
            to="/login"
            className={classNavLink}
            onClick={() => {
            }}
          >
            Выход
          </NavLink>
        </nav>
        <p
          className={`${
            style.text
          } text text_type_main-default mt-20`}
        >
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </div>
      <form
        className={style.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          extraClass={'pb-6'}
          type='text'
          name='name'
          placeholder={'Имя'}
          onChange={(e) => handleChange(e)}
          value={values.name || ''}
          error={Boolean(errors.name)}
          errorText={errors.name}
          size={'default'}
          minLength='2'
          maxLength='30'
          icon={'EditIcon'}
          required
        />
        <Input
          extraClass={'pb-6'}
          type='email'
          name='email'
          placeholder={'Логин'}
          onChange={(e) => handleChange(e)}
          onPaste={(e) => handleChange(e)}
          value={values.email || ''}
          error={Boolean(errors.email)}
          errorText={errors.email}
          size={'default'}
          icon={'EditIcon'}
          required
        />
        <Input
          extraClass={'pb-6'}
          type='password'
          name='password'
          placeholder={'Пароль'}
          onChange={(e) => handleChange(e)}
          value={values.password || ''}
          error={Boolean(errors.password)}
          errorText={errors.password}
          size={'default'}
          minLength='6'
          maxLength='20'
          icon={'EditIcon'}
          required
        />
        <div className={style.buttonContainer}>
          <Button extraClass={style.button} htmlType='button' type='secondary' size='small'>
            Отмена
          </Button>
          <Button extraClass={style.button} htmlType='submit' type='primary' size='medium' disabled={!isValid}>
            Сохранить
          </Button>
        </div>
      </form>

    </section>
  )
}

export default Profile;


