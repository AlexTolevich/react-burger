import React, {useEffect} from 'react';

import style from "./ForgotPassword.module.css";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useFormWithValidation} from "../../utils/hooks/useValidation";
import {useDispatch, useSelector} from "react-redux";
import {getForgotPSWDRequest, getLoggedIn} from "../../services/selectors/selectors";
import Preloader from "../../components/Preloader/Preloader";
import {onForgotPSWD} from "../../services/actions/auth";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotPSWDRequest = useSelector(getForgotPSWDRequest);
  const loggedIn = useSelector(getLoggedIn);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(onForgotPSWD({
        email: values.email,
      },
      () => navigate('/reset-password')));
  }

  return loggedIn ?
    <Navigate to={"/"} replace/>
    :
    (<section className={style.container}>
        <h2 className={`text text_type_main-medium pb-6`}>
          Восстановление пароля
        </h2>
        {forgotPSWDRequest ? <Preloader/> :
          <form
            className={style.form}
            onSubmit={handleSubmit}
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


