import React, {useCallback} from 'react';
import isEmail              from 'validator/es/lib/isEmail';

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});

    if (name === 'email') {
      if (!isEmail(value)) {
        setErrors({...errors, [name]: 'Ошибка формата адреса почты'});
      } else {
        setErrors({...errors, [name]: ''});
      }
    } else {
      setErrors({...errors, [name]: target.validationMessage});
    }

    if (name === 'email') {
      setIsValid(isEmail(value) && target.closest('form').checkValidity());
    } else {
      setIsValid(target.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {values, handleChange, errors, isValid, resetForm};
}