class Auth {
  constructor(url) {
    this.url = url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  register(email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email, "password": password }),
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  authorization(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ "email": email, "password": password }),
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  getContent() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  signout() {
    return fetch(`${this.url}/signout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }
};

export default new Auth(
  "https://api.pictdesign.nomoredomains.xyz"
);