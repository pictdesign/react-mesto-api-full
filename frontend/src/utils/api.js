class Api {
  constructor(url, cohort, token) {
    this._url = url;
    this._cohort = cohort;
    this._token = token;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetch(request, requestOptions) {
    return fetch(this._url + this._cohort + request, {
      headers: {
        authorization: this._token,
      },
      ...requestOptions,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return this._fetch("/users/me");
  }

  changeUserInfo({ name, about }) {
    return this._fetch("/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    });
  }

  addCard({ link, name }) {
    return this._fetch("/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ link, name }),
    });
  }

  changeUserAvatar({ avatar }) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._token,
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
      headers: {
        authorization: this._token,
      },
    });
  }

  likeCard(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    });
  }

  deleteLike(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
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
  "https://mesto.nomoreparties.co/v1/",
  "cohort-28",
  "0e67701d-63ae-4a9e-9207-db93e93ce8e5"
);