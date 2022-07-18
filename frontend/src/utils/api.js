class Api {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData);
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, about }),
    })
    .then(this._getResponseData);
  }

  addCard({ link, name }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ link, name }),
    })
    .then(this._getResponseData);
  }

  changeUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ avatar }),
    })
    .then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }
}

export default new Api(
  'https://api.pictdesign.nomoredomains.xyz'
);