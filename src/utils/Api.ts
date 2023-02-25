import {getCookie} from "./cookies";
import {IHeaders, IOrderIngredients, IUserData} from "./types";

const BASE_URL = "https://norma.nomoreparties.space/api";

const defaultHeaders =
  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

const _checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

function onGetIngredientsRequest(headers: IHeaders = defaultHeaders) {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: headers,
  }).then((res) => _checkResponse(res));
}

function postOrder(data: IOrderIngredients, headers: IHeaders = defaultHeaders) {
  headers.authorization = 'Bearer ' + getCookie('accessToken');
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then((res) => _checkResponse(res));
}

function signup(data: Partial<IUserData>, headers: IHeaders = defaultHeaders) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({email: data.email, password: data.password, name: data.name})
  }).then((res) => _checkResponse(res));
}

function signin(data: Partial<IUserData>, headers: IHeaders = defaultHeaders) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({email: data.email, password: data.password})
  }).then((res) => _checkResponse(res));
}

function refreshToken(headers: IHeaders = defaultHeaders) {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  }).then((res) => _checkResponse(res));
}

function logout(data: string | null, headers: IHeaders = defaultHeaders) {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      token: data,
    })
  }).then((res) => _checkResponse(res));
}

function getUser(headers: IHeaders = defaultHeaders) {
  headers.authorization = 'Bearer ' + getCookie('accessToken');
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: headers,
  }).then((res) => _checkResponse(res));
}

function patchUser(data: Partial<IUserData>, headers: IHeaders = defaultHeaders) {
  headers.authorization = 'Bearer ' + getCookie('accessToken');
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({name: data.name, email: data.email, password: data.password})
  }).then((res) => _checkResponse(res));
}

function forgotPSWD(data: Partial<IUserData>, headers: IHeaders = defaultHeaders) {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({email: data.email})
  }).then((res) => _checkResponse(res));
}

function resetPSWD(data: Partial<IUserData>, headers: IHeaders = defaultHeaders) {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      token: data.token,
      password: data.password
    })
  }).then((res) => _checkResponse(res));
}


export {
  onGetIngredientsRequest,
  postOrder,
  signup,
  signin,
  refreshToken,
  logout,
  getUser,
  patchUser,
  forgotPSWD,
  resetPSWD
};