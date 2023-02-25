import React, {useState, useEffect} from 'react';

import style from "./Register.module.css";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import {useFormWithValidation} from "../../utils/hooks/useValidation";
import {useDispatch, useSelector} from "react-redux";
import {getUserRequest} from "../../services/constants/selectors";
import Preloader from "../../components/Preloader/Preloader";
import {onRegister} from "../../services/actions/auth";
import {TDispatch} from "../../utils/types";

function Register() {
  const dispatch = useDispatch<TDispatch>();
  const navigate = useNavigate();
  const userRequest = useSelector(getUserRequest);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(onRegister({
        name: values.name,
        email: values.email,
        password: values.password
      },
      () => navigate('/')));
  }

  return (
    <section className={style.container}>
      <h2 className={`text text_type_main-medium pb-6`}>
        Регистрация
      </h2>
      {userRequest ? <Preloader/> :
        <form
          className={style.form}
          onSubmit={(event) => handleSubmit(event)}
          noValidate
        >
          <Input
            extraClass={'pb-6'}
            type="text"
            name="name"
            placeholder={'Имя'}
            onChange={(e) => handleChange(e)}
            value={values.name || ""}
            error={Boolean(errors.name)}
            errorText={errors.name}
            size={'default'}
            minLength={2}
            maxLength={30}
            required
          />
          <Input
            extraClass={'pb-6'}
            type="email"
            name="email"
            placeholder={'E-mail'}
            onChange={(e) => handleChange(e)}
            value={values.email || ""}
            error={Boolean(errors.email)}
            errorText={errors.email}
            size={'default'}
            required
          />
          <Input
            extraClass={'pb-6'}
            type={hidden ? 'password' : 'text'}
            name="password"
            placeholder={'Пароль'}
            onChange={(e) => handleChange(e)}
            onIconClick={() => setHidden(!hidden)}
            icon={hidden ? 'ShowIcon' : 'HideIcon'}
            value={values.password || ""}
            error={Boolean(errors.password)}
            errorText={errors.password}
            size={'default'}
            minLength={6}
            maxLength={20}
            required
          />
          <Button extraClass={style.button} htmlType="submit" type="primary" size="medium" disabled={!isValid}>
            Зарегистрироваться
          </Button>
        </form>
      }
      <p className={`${style.text} text text_type_main-default mt-20`}>
        Уже зарегистрированы?
        <Link to="/login" className={style.link}> Войти</Link>
      </p>
    </section>
  )
}

export default Register;


