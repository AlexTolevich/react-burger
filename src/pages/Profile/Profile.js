import React, {useState, useEffect} from 'react';

import style from './Profile.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useNavigate} from 'react-router-dom';
import {useFormWithValidation} from '../../utils/hooks/useValidation';
import {useDispatch, useSelector} from "react-redux";
import {onGetUser, onLogout, onPatchUser} from "../../services/actions";
import {getUser} from "../../services/selectors/selectors";
import Preloader from "../../components/Preloader/Preloader";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userRequest, email, name} = useSelector(getUser);
  const refreshToken = localStorage.getItem('refreshToken');
  const {values, handleChange, errors, resetForm} = useFormWithValidation();
  const classNavLink = (isActive) => `${style.link} text text_type_main-medium ` + (isActive?.isActive && style.link_active);

  useEffect(() => {
    dispatch(onGetUser());
    resetForm({name: name, email: email, password: ''});
  }, [resetForm, name, email]);

  function handleSubmit(event) {
    event.preventDefault();
    let data = {};

    if (name !== values.name) {
      data = ({...data, name: values.name})
    }

    if (email !== values.email) {
      data = ({...data, email: values.email})
    }

    if (values.password.length >= 6) {
      data = ({...data, password: values.password})
    }
    dispatch(onPatchUser(data));
  }

  function handleResetForm() {
    resetForm({name: name, email: email, password: ''});
  }

  function handleExitUser() {
    dispatch(onLogout({refreshToken},
      () => navigate('/login')));
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
            to=""
            className={classNavLink}
            onClick={handleExitUser}
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
        {userRequest ? <Preloader/> :
          <>
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
              <Button extraClass={style.button} htmlType='button' type='secondary' size='small'
                      onClick={handleResetForm}>
                Отмена
              </Button>
              <Button extraClass={style.button} htmlType='submit' type='primary' size='medium' disabled={false}>
                Сохранить
              </Button>
            </div>
          </>
        }
      </form>
    </section>
  )
}

export default Profile;

