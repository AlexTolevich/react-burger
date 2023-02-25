import {getUser, logout, patchUser} from "../../utils/Api";
import {deleteCookie} from "../../utils/cookies";
import {IUserData} from "../../utils/types";
import {
  IPostUserFailed,
  IPostUserRequest,
  IPostUserSuccess,
  IUserLoggedIn,
  IUserLoggedOut,
  onRefreshToken,
  postUserFailed,
  postUserRequest,
  postUserSuccess,
  userLoggedIn,
  userLoggedOut
} from "./auth";

export function onLogout(data: string | null, navigate: { (): void; (): void; }) {
  return function (dispatch: (arg0: IPostUserRequest | IPostUserSuccess | IUserLoggedOut | IPostUserFailed) => void) {
    dispatch(postUserRequest());
    logout(data)
      .then((res) => {
          if (res && res.success) {
            dispatch(postUserSuccess({email: '', name: ''}));
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(userLoggedOut());
            navigate();
          }
        }
      )
      .catch((err) => {
          dispatch(postUserFailed());
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
      )
  }
}

export function onGetUser() {
  return function (dispatch: (arg0: IPostUserRequest | IPostUserSuccess | IPostUserFailed | IUserLoggedIn) => void) {
    dispatch(postUserRequest());
    getUser()
      .then((res) => {
          if (res && res.success) {
            dispatch(postUserSuccess(res.user));
            dispatch(userLoggedIn())
          }
        }
      )
      .catch((err) => {
          if (err === 403) {
            // @ts-ignore
            dispatch(onRefreshToken())
            dispatch(postUserFailed());
          } else {
            dispatch(postUserFailed());
            console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
          }
        }
      )
  }
}

export function onPatchUser(data: Partial<IUserData>) {
  return function (dispatch: (arg0: IPostUserRequest | IPostUserSuccess | IPostUserFailed | IUserLoggedIn) => void) {
    dispatch(postUserRequest());
    patchUser(data)
      .then((res) => {
          if (res && res.success) {
            dispatch(postUserSuccess(res.user));
            dispatch(userLoggedIn())
          }
        }
      )
      .catch((err) => {
          dispatch(postUserFailed());
          console.log(err, err.message, 'Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
      )
  }
}