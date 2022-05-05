class Api {
  constructor(options) {
    this.options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo = () => {
    return fetch("https://nomoreparties.co/v1/cohort-34/users/me", {
      headers: {
        authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
      },
    }).then((res) => this._checkResponse(res));
  };

  getInitialCards = () => {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-34/cards", {
      headers: {
        authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
      },
    }).then((res) => this._checkResponse(res));
  };

  patchAvatar = (body) => {
    return fetch("https://nomoreparties.co/v1/cohort-34/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
        "Content-Type": "application/json",
      },
      body: body,
    }).then((res) => this._checkResponse(res));
  };

  patchUserInfo = (body) => {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-34/users/me", {
      method: "PATCH",
      headers: {
        authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
        "Content-Type": "application/json",
      },
      body: body,
    }).then((res) => this._checkResponse(res));
  };

  postNewCard = (body) => {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-34/cards", {
      method: "POST",
      headers: {
        authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
        "Content-Type": "application/json",
      },
      body: body,
    }).then((res) => this._checkResponse(res));
  };

  deleteCard = (cardId) => {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-34/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
        },
      }
    ).then((res) => this._checkResponse(res));
  };

  putLike = (body, cardId) => {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-34/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
          "Content-Type": "application/json",
        },
        body: body,
      }
    ).then((res) => this._checkResponse(res));
  };

  deleteLike = (body, cardId) => {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-34/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
          "Content-Type": "application/json",
        },
        body: body,
      }
    ).then((res) => this._checkResponse(res));
  };

//   changeLikeCardStatus(body, cardId, checkLike) {
//     if (checkLike) {
//       this.deleteLike(body, cardId);
//     } else {
//       this.putLike(body, cardId);
//     }
//   };
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "f6c561df-ef33-43f7-885e-c25f80e98ae8",
    "Content-Type": "application/json",
  },
});

export default api;
