import {forgotPSWD, refreshToken, resetPSWD, signin, signup} from "../../utils/Api";
import {deleteCookie, setCookie} from "../../utils/cookies";
import {onGetUser} from "./user";

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILED = 'POST_USER_FAILED';
export const POST_TOKEN_REQUEST = 'POST_TOKEN_REQUEST';
export const POST_TOKEN_SUCCESS = 'POST_TOKEN_SUCCESS';
export const POST_TOKEN_FAILED = 'POST_TOKEN_FAILED';
export const FORGOT_PSWD_REQUEST = 'FORGOT_PSWD_REQUEST';
export const FORGOT_PSWD_SUCCESS = 'FORGOT_PSWD_SUCCESS';
export const FORGOT_PSWD_FAILED = 'FORGOT_PSWD_FAILED';
export const RESET_PSWD_REQUEST = 'RESET_PSWD_REQUEST';
export const RESET_PSWD_SUCCESS = 'RESET_PSWD_SUCCESS';
export const RESET_PSWD_FAILED = 'RESET_PSWD_FAILED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export function postUserRequest() {
  return {type: POST_USER_REQUEST}
}

export function postUserSuccess(user) {
  return {
    type: POST_USER_SUCCESS,
    user
  }
}

export function postUserFailed() {
  return {type: POST_USER_FAILED}
}

export function userLoggedIn() {
  return {type: USER_LOGGED_IN}
}

export function userLoggedOut() {
  return {type: USER_LOGGED_OUT}
}

export function onRegister(data, navigate) {
  return function (dispatch) {
    dispatch(postUserRequest());
    signup(data)
      .then((res) => {
          if (res && res.success) {
            dispatch(postUserSuccess(res.user));
            const authToken = res.accessToken.split('Bearer ')[1];
            if (authToken) {
              setCookie('accessToken', authToken, {expires: 1200});
            }
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(userLoggedIn())
            navigate();
          }
        }
      )
      .catch((err) => {
        dispatch(postUserFailed());
        if (err === 400) {
          console.log(err, 'Переданы некорректные данные при создании пользователя.');
        } else if (err === 409 || err === 403) {
          console.log(err, 'Пользователь с указанным email уже зарегистрирован.');
        } else {
          console.log(err, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
      })
  }
}

export function onLogin(data, navigate) {
  return function (dispatch) {
    dispatch(postUserRequest());
    signin(data)
      .then((res) => {
          if (res && res.success) {
            dispatch(postUserSuccess(res.user));
            const authToken = res.accessToken?.split('Bearer ')[1];
            if (authToken) {
              setCookie('accessToken', authToken, {expires: 1200});
            }
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(userLoggedIn())
            navigate();
          }
        }
      )
      .catch((err) => {
        dispatch(postUserFailed());
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

export function onRefreshToken() {
  return function (dispatch) {
    dispatch({
      type: POST_TOKEN_REQUEST,
    });
    deleteCookie('accessToken');
    refreshToken()
      .then((res) => {
        return res
      })
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: POST_TOKEN_SUCCESS,
            });
            const authToken = res.accessToken.split('Bearer ')[1];
            if (authToken) {
              setCookie('accessToken', authToken, {expires: 1200});
            }
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(onGetUser())
          }
        }
      ).catch((err) => {
      dispatch({
        type: POST_TOKEN_FAILED
      });
      console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
    });
  }
}

export function onForgotPSWD(data, navigate) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PSWD_REQUEST
    });
    forgotPSWD(data)
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: FORGOT_PSWD_SUCCESS
            })
            navigate();
          }
        }
      )
      .catch((err) => {
          dispatch({
            type: FORGOT_PSWD_FAILED
          });
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');

        }
      )
  }
}

export function onResetPSWD(data, navigate) {
  return function (dispatch) {
    dispatch({
      type: RESET_PSWD_REQUEST
    });
    resetPSWD(data)
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: RESET_PSWD_SUCCESS
            })
            navigate();
          }
        }
      )
      .catch((err) => {
          dispatch({
            type: RESET_PSWD_FAILED
          });
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');

        }
      )
  }
}