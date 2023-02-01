import {getInrgedientsRequest, postOrder, signin, signup} from "../../utils/Api";
import {setCookie} from "../../utils/cookies";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_VIEWED_INGREDIENT = 'ADD_VIEWED_INGREDIENT';
export const DEL_VIEWED_INGREDIENT = 'DEL_VIEWED_INGREDIENT';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const POST_SIGNUP_REQUEST = 'POST_SIGNUP_REQUEST';
export const POST_SIGNUP_SUCCESS = 'POST_SIGNUP_SUCCESS';
export const POST_SIGNUP_FAILED = 'POST_SIGNUP_FAILED';
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';


export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getInrgedientsRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}

export function submitOrder({ingredients}) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    postOrder({ingredients}).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          order: res.order
        });
        dispatch({type: RESET_INGREDIENTS});
      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
    });
  };
}

export function onRegister(data) {
  return function (dispatch) {
    dispatch({
      type: POST_SIGNUP_REQUEST
    });
    signup(data)
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: POST_SIGNUP_SUCCESS,
              user: res.user,
              refreshToken: res.refreshToken,
            });
            const authToken = res.accessToken.split('Bearer ')[1];
            if (authToken) {
              setCookie('accessToken', authToken);
            }
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch({type: USER_LOGGED_IN})
          }
        }
      )
      .catch((err) => {
        dispatch({
          type: POST_SIGNUP_FAILED
        });
        if (err === 400) {
          console.log(err, 'Переданы некорректные данные при создании пользователя.');

        } else if (err === 409) {
          console.log(err, 'Пользователь с указанным email уже зарегистрирован.');

        } else {
          console.log(err, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
      })
  }
}

export function onLogin(data) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST
    });
    signin(data)
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: POST_LOGIN_SUCCESS,
              user: res.user,
              refreshToken: res.refreshToken,
            });
            const authToken = res.accessToken.split('Bearer ')[1];
            if (authToken) {
              setCookie('accessToken', authToken);
            }
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch({type: USER_LOGGED_IN})
          }
        }
      )
      .catch((err) => {
        dispatch({
          type: POST_LOGIN_FAILED
        });
        if (err === 401) {
          console.log(err, 'Неправильные почта или пароль.');

        } else if (err === 400) {
          console.log(err, 'Введены не корректные данные.');

        } else {
          console.log(err, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
      })
  }
}