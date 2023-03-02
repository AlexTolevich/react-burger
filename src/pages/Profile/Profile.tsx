import React, {useEffect} from 'react';

import style from './Profile.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useFormWithValidation} from '../../utils/hooks/useValidation';
import {getUser} from "../../services/constants/selectors";
import Preloader from "../../components/Preloader/Preloader";
import {onPatchUser} from "../../services/actions/user";
import {useDispatch, useSelector} from "../../services/hooks";
import ProfileNavMenu from "../../components/ProfileNavMenu/ProfileNavMenu";

function Profile() {
  const dispatch = useDispatch();
  const {userRequest, email, name} = useSelector(getUser);
  const {values, handleChange, errors, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm({name: name, email: email, password: ''});
  }, [resetForm, name, email]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

  return (
    <section className={style.container}>
      <ProfileNavMenu/>
      <form
        className={`${style.form} pt-30`}
        onSubmit={(event) => handleSubmit(event)}
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
              minLength={2}
              maxLength={30}
              icon={'EditIcon'}
              required
            />
            <Input
              extraClass={'pb-6'}
              type='email'
              name='email'
              placeholder={'Логин'}
              onChange={(e) => handleChange(e)}
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
              minLength={6}
              maxLength={20}
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


