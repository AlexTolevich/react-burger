const BASE_URL = "https://norma.nomoreparties.space/api";

function getInrgedientsRequest() {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json', 'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

function postOrder(data) {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', 'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export {getInrgedientsRequest, postOrder};