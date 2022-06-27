const BASE_URL = "https://norma.nomoreparties.space/api";

function getData() {
  return fetch(`${BASE_URL}/ingredients`, {
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

export default getData;