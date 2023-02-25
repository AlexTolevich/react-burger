import {getUser, logout, patchUser} from "../../utils/Api";
import {deleteCookie} from "../../utils/cookies";
import {AppThunk, IUserData} from "../../utils/types";
import {

  onRefreshToken,
  postUserFailed,
  postUserRequest,
  postUserSuccess,
  userLoggedIn,
  userLoggedOut
} from "./auth";

export const onLogout = (data: string | null, navigate: () => void): AppThunk => {
  return function (dispatch) {
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

export const onGetUser = (): AppThunk => {
  return function (dispatch) {
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

export const onPatchUser = (data: Partial<IUserData>): AppThunk => {
  return function (dispatch) {
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