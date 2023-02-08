import {getUser, logout, patchUser} from "../../utils/Api";
import {deleteCookie} from "../../utils/cookies";
import {
  onRefreshToken,
  POST_LOGIN_FAILED,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "./auth";

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';

export function onLogout(data, navigate) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST
    });
    logout(data)
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: POST_LOGOUT_SUCCESS,
              user: {email: '', name: '',},
              refreshToken: '',
            });
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({
              type: USER_LOGGED_OUT,
            });
            navigate();
          }
        }
      )
      .catch((err) => {
          dispatch({
            type: POST_LOGOUT_FAILED
          });
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
      )
  }
}

export function onGetUser() {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST
    });
    getUser()
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: POST_LOGIN_SUCCESS,
              user: res.user,
            });
            dispatch({type: USER_LOGGED_IN})
          }
        }
      )
      .catch((err) => {
          if (err === 403) {
            dispatch(onRefreshToken())
            dispatch({
              type: POST_LOGIN_FAILED
            });
          } else {
            dispatch({
              type: POST_LOGIN_FAILED
            });
            console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
          }
        }
      )
  }
}

export function onPatchUser(data) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST
    });
    patchUser(data)
      .then((res) => {
          if (res && res.success) {
            dispatch({
              type: POST_LOGIN_SUCCESS,
              user: res.user,
            });
            dispatch({type: USER_LOGGED_IN})
          }
        }
      )
      .catch((err) => {
          dispatch({
            type: POST_LOGIN_FAILED
          });
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
      )
  }
}