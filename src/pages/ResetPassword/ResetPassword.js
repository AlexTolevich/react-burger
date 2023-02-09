import React, {useState, useEffect} from 'react';

import style from "./ResetPassword.module.css";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import {useFormWithValidation} from "../../utils/hooks/useValidation";
import {useDispatch, useSelector} from "react-redux";
import {getForgotPSWD, getResetPSWDRequest} from "../../services/selectors/selectors";
import Preloader from "../../components/Preloader/Preloader";
import {onResetPSWD} from "../../services/actions/auth";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPSWDRequest = useSelector(getResetPSWDRequest);
  const forgotPSWD = useSelector(getForgotPSWD);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    !forgotPSWD && navigate("/forgot-password")
  }, []);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(onResetPSWD({
      token: values.token,
      password: values.password
    }, () => navigate('/login')));
  }

  return (
    <section className={style.container}>
      <h2 className={`text text_type_main-medium pb-6`}>
        Восстановление пароля
      </h2>
      {resetPSWDRequest ? <Preloader/> :
        <form
          className={style.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            extraClass={'pb-6'}
            type={hidden ? 'password' : 'text'}
            name="password"
            placeholder={'Введите новый пароль'}
            onChange={(e) => handleChange(e)}
            onIconClick={() => setHidden(!hidden)}
            icon={hidden ? 'ShowIcon' : 'HideIcon'}
            value={values.password || ""}
            error={Boolean(errors.password)}
            errorText={errors.password}
            size={'default'}
            minLength="6"
            maxLength="20"
            required
          />
          <Input
            extraClass={'pb-6'}
            type="text"
            name="token"
            placeholder={'Введите код из письма'}
            onChange={(e) => handleChange(e)}
            value={values.token || ""}
            error={Boolean(errors.token)}
            errorText={errors.token}
            size={'default'}
            minLength="2"
            maxLength="50"
            required
          />
          <Button extraClass={style.button} htmlType="submit" type="primary" size="medium" disabled={!isValid}>
            Сохранить
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

export default ResetPassword;


