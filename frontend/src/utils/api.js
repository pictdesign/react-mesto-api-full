class Api {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetch(request, requestOptions) {
    return fetch(this._url + request, {
      credentials: 'include',
      ...requestOptions,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  changeUserInfo({ name, about }) {
    return this._fetch("/users/me", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    });
  }

  addCard({ link, name }) {
    return this._fetch("/cards", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ link, name }),
    });
  }

  changeUserAvatar({ avatar }) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    });
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "PUT",
    });
  }

  deleteLike(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "DELETE",
    });
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
  "http://api.pictdesign.nomoredomains.xyz",
);