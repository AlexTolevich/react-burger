import {forgotPSWD, refreshToken, resetPSWD, signin, signup} from "../../utils/Api";
import {deleteCookie, setCookie} from "../../utils/cookies";
import {onGetUser} from "./user";
import {
  FORGOT_PSWD_FAILED,
  FORGOT_PSWD_REQUEST,
  FORGOT_PSWD_SUCCESS,
  POST_TOKEN_FAILED,
  POST_TOKEN_REQUEST,
  POST_TOKEN_SUCCESS,
  POST_USER_FAILED,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  RESET_PSWD_FAILED,
  RESET_PSWD_REQUEST,
  RESET_PSWD_SUCCESS,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../constants";
import {IUserData} from "../../utils/types";

export interface IPostUserRequest {
  readonly type: typeof POST_USER_REQUEST;
}

export interface IPostUserSuccess {
  readonly type: typeof POST_USER_SUCCESS;
  readonly user: Partial<IUserData>;
}

export interface IPostUserFailed {
  readonly type: typeof POST_USER_FAILED;
}

export interface IUserLoggedIn {
  readonly type: typeof USER_LOGGED_IN;
}

export interface IUserLoggedOut {
  readonly type: typeof USER_LOGGED_OUT;
}

export interface IPostTokenRequest {
  readonly type: typeof POST_TOKEN_REQUEST;
}

export interface IPostTokenSuccess {
  readonly type: typeof POST_TOKEN_SUCCESS;
}

export interface IPostTokenFailed {
  readonly type: typeof POST_TOKEN_FAILED;
}

export interface IForgotPSWDRequest {
  readonly type: typeof FORGOT_PSWD_REQUEST;
}

export interface IForgotPSWDSuccess {
  readonly type: typeof FORGOT_PSWD_SUCCESS;
}

export interface IForgotPSWDFailed {
  readonly type: typeof FORGOT_PSWD_FAILED;
}

export interface IResetPSWDRequest {
  readonly type: typeof RESET_PSWD_REQUEST;
}

export interface IResetPSWDSuccess {
  readonly type: typeof RESET_PSWD_SUCCESS;
}

export interface IResetPSWDFailed {
  readonly type: typeof RESET_PSWD_FAILED;
}

export function postUserRequest(): IPostUserRequest {
  return {type: POST_USER_REQUEST}
}

export function postUserSuccess(user: Partial<IUserData>): IPostUserSuccess {
  return {
    type: POST_USER_SUCCESS,
    user
  }
}

export function postUserFailed(): IPostUserFailed {
  return {type: POST_USER_FAILED}
}

export function userLoggedIn(): IUserLoggedIn {
  return {type: USER_LOGGED_IN}
}

export function userLoggedOut(): IUserLoggedOut {
  return {type: USER_LOGGED_OUT}
}

export function postTokenRequest(): IPostTokenRequest {
  return {type: POST_TOKEN_REQUEST}
}

export function postTokenSuccess(): IPostTokenSuccess {
  return {type: POST_TOKEN_SUCCESS}
}

export function postTokenFailed(): IPostTokenFailed {
  return {type: POST_TOKEN_FAILED}
}

export function forgotPSWDRequest(): IForgotPSWDRequest {
  return {type: FORGOT_PSWD_REQUEST}
}

export function forgotPSWDSuccess(): IForgotPSWDSuccess {
  return {type: FORGOT_PSWD_SUCCESS}
}

export function forgotPSWDFailed(): IForgotPSWDFailed {
  return {type: FORGOT_PSWD_FAILED}
}

export function resetPSWDRequest(): IResetPSWDRequest {
  return {type: RESET_PSWD_REQUEST}
}

export function resetPSWDSuccess(): IResetPSWDSuccess {
  return {type: RESET_PSWD_SUCCESS}
}

export function resetPSWDFailed(): IResetPSWDFailed {
  return {type: RESET_PSWD_FAILED}
}

export function onRegister(data: Partial<IUserData>, navigate: { (): void; (): void; }) {
  return function (dispatch: (arg0: IPostUserRequest | IPostUserSuccess | IPostUserFailed | IUserLoggedIn) => void) {
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

export function onLogin(data: Partial<IUserData>, navigate: { (): void; (): void; }) {
  return function (dispatch: (arg0: IPostUserRequest | IPostUserSuccess | IPostUserFailed | IUserLoggedIn) => void) {
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
  return function (dispatch: (arg0: IPostTokenRequest | IPostTokenSuccess | IPostTokenFailed) => void) {
    dispatch(postTokenRequest());
    deleteCookie('accessToken');
    refreshToken()
      .then((res) => {
        return res
      })
      .then((res) => {
          if (res && res.success) {
            dispatch(postTokenSuccess());
            const authToken = res.accessToken.split('Bearer ')[1];
            if (authToken) {
              setCookie('accessToken', authToken, {expires: 1200});
            }
            localStorage.setItem('refreshToken', res.refreshToken);
            // @ts-ignore
            dispatch(onGetUser())
          }
        }
      ).catch((err) => {
      dispatch(postTokenFailed());
      console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
    });
  }
}

export function onForgotPSWD(data: Partial<IUserData>, navigate: { (): void; (): void; }) {
  return function (dispatch: (arg0: IForgotPSWDRequest | IForgotPSWDSuccess | IForgotPSWDFailed) => void) {
    dispatch(forgotPSWDRequest());
    forgotPSWD(data)
      .then((res) => {
          if (res && res.success) {
            dispatch(forgotPSWDSuccess());
            navigate();
          }
        }
      )
      .catch((err) => {
          dispatch(forgotPSWDFailed());
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');

        }
      )
  }
}

export function onResetPSWD(data: Partial<IUserData>, navigate: { (): void; (): void; }) {
  return function (dispatch: (arg0: IResetPSWDRequest | IResetPSWDSuccess | IResetPSWDFailed) => void) {
    dispatch(resetPSWDRequest());
    resetPSWD(data)
      .then((res) => {
          if (res && res.success) {
            dispatch(resetPSWDSuccess())
            navigate();
          }
        }
      )
      .catch((err) => {
          dispatch(resetPSWDFailed());
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');

        }
      )
  }
}