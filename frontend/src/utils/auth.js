class Auth {
  constructor(url) {
    this.url = url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));
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
    .then(this._getResponseData);
  };
  
  authorization(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    .then(this._getResponseData);
  };
  
  getContent() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData);
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
    .then(this._getResponseData);
  }
}

export default new Auth(
  'https://api.pictdesign.nomoredomains.xyz'
);