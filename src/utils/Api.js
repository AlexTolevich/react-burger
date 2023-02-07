import {getCookie} from "./cookies";

const BASE_URL = "https://norma.nomoreparties.space/api";

const defaultHeaders =
  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

function getInrgedientsRequest(headers = defaultHeaders) {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: headers,
  }).then((res) => _checkResponse(res));
}

function postOrder(data, headers = defaultHeaders) {
  headers.authorization = 'Bearer ' + getCookie('accessToken');
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then((res) => _checkResponse(res));
}

function signup(data, headers = defaultHeaders) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({email: data.email, password: data.password, name: data.name})
  }).then((res) => _checkResponse(res));
}

function signin(data, headers = defaultHeaders) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({email: data.email, password: data.password})
  }).then((res) => _checkResponse(res));
}

function logout(data, headers = defaultHeaders) {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      token: data.refreshToken,
    })
  }).then((res) => _checkResponse(res));
}

function getUser(headers = defaultHeaders) {
  headers.authorization = 'Bearer ' + getCookie('accessToken');
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: headers,
  }).then((res) => _checkResponse(res));
}

function patchUser(data, headers = defaultHeaders) {
  headers.authorization = 'Bearer ' + getCookie('accessToken');
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({name: data.name, email: data.email, password: data.password})
  }).then((res) => _checkResponse(res));
}

function forgotPSWD(data, headers = defaultHeaders) {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({email: data.email})
  }).then((res) => _checkResponse(res));
}

function resetPSWD(data, headers = defaultHeaders) {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      token: data.token,
      password: data.password
    })
  }).then((res) => _checkResponse(res));
}


export {getInrgedientsRequest, postOrder, signup, signin, logout, getUser, patchUser, forgotPSWD, resetPSWD};