import React, {useEffect} from 'react';

import style from "./ForgotPassword.module.css";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import {useFormWithValidation} from "../../utils/hooks/useValidation";
import {useDispatch, useSelector} from "react-redux";
import {getForgotPSWDRequest} from "../../services/selectors/selectors";
import Preloader from "../../components/Preloader/Preloader";
import {onForgotPSWD} from "../../services/actions/auth";
import {TDispatch} from "../../utils/types";

function ForgotPassword() {
  const dispatch = useDispatch<TDispatch>();
  const navigate = useNavigate();
  const forgotPSWDRequest = useSelector(getForgotPSWDRequest);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event:  React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(onForgotPSWD({
        email: values.email,
      },
      () => navigate('/reset-password')));
  }

  return (
    <section className={style.container}>
      <h2 className={`text text_type_main-medium pb-6`}>
        Восстановление пароля
      </h2>
      {forgotPSWDRequest ? <Preloader/> :
        <form
          className={style.form}
          onSubmit={(event) => handleSubmit(event)}
          noValidate
        >
          <Input
            extraClass={'pb-6'}
            type="email"
            name="email"
            placeholder={'Укажите e-mail'}
            onChange={(e) => handleChange(e)}
            value={values.email || ""}
            error={Boolean(errors.email)}
            errorText={errors.email}
            size={'default'}
            required
          />
          <Button extraClass={style.button} htmlType="submit" type="primary" size="medium" disabled={!isValid}>
            Восстановить
          </Button>
        </form>
      }
      <p className={`${style.text} text text_type_main-default mt-20`}>
        Вспомнили пароль?
        <Link to="/login" className={style.link}> Войти</Link>
      </p>
    </section>
  )
}

export default ForgotPassword;


