import React, {useState, useEffect, FormEvent} from 'react';

import style from "./Login.module.css";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useFormWithValidation} from "../../utils/hooks/useValidation";
import {useDispatch, useSelector} from "react-redux";
import {getUserRequest} from "../../services/selectors/selectors";
import Preloader from "../../components/Preloader/Preloader";
import {onLogin} from "../../services/actions/auth";
import {TDispatch, TLocationState} from "../../utils/types";

function Login() {
  const dispatch = useDispatch<TDispatch>();
  const location = useLocation();
  const { from } = location.state as TLocationState;
  const navigate = useNavigate();
  const userRequest = useSelector(getUserRequest);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(onLogin({
        email: values.email,
        password: values.password
      },
      () => navigate(from?.pathname ? from?.pathname : "/")
    ));
  }

  return (
    <section className={style.container}>
      <h2 className={`text text_type_main-medium pb-6`}>
        Вход
      </h2>
      {userRequest ? <Preloader/> :
        <form
          className={style.form}
          onSubmit={handleSubmit}
          noValidate
        >
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
            Войти
          </Button>
        </form>
      }
      <p className={`${style.text} text text_type_main-default mt-20`}>
        Вы — новый пользователь?
        <Link to="/register" className={style.link}> Зарегистрироваться</Link>
      </p>
      <p className={`${style.text} text text_type_main-default mt-4`}>
        Забыли пароль?
        <Link to="/forgot-password" className={style.link}> Восстановить пароль</Link>
      </p>
    </section>
  )
}

export default Login;


