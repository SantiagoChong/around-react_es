// ID: web_es_cohort_03
// 093facbb-999f-4e95-80c4-1209ec92f045

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this.headers = headers;
    this._authorization = headers.authorization;
  }

  _useFetch(baseUrl, method, body) {
    return fetch(baseUrl, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProfileInfo() {
    return this._useFetch(`${this._baseUrl}/users/me`, "GET");
  }

  editProfile(name, about) {
    return this._useFetch(`${this._baseUrl}/users/me`, "PATCH", {
      name: name,
      about: about,
    });
  }

  getInitialCards() {
    return this._useFetch(`${this._baseUrl}/cards`, "GET");
  }

  addNewCard(name, link) {
    return this._useFetch(`${this._baseUrl}/cards`, "POST", {
      name: name,
      link: link,
    });
  }

  deleteCard(cardId) {
    return this._useFetch(`${this._baseUrl}/cards/${cardId}`, "DELETE");
  }

  addCardLike(cardId) {
    return this._useFetch(`${this._baseUrl}/cards/likes/${cardId}`, "PUT");
  }

  deleteCardLike(cardId) {
    return this._useFetch(`${this._baseUrl}/cards/likes/${cardId}`, "DELETE");
  }

  changeLikeCardStatus(cardId, liked) {
    return liked ? this.addCardLike(cardId) : this.deleteCardLike(cardId);
  }

  newAvatar(link) {
    return this._useFetch(`${this._baseUrl}/users/me/avatar`, "PATCH", {
      avatar: link,
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_03",
  headers: {
    authorization: "093facbb-999f-4e95-80c4-1209ec92f045",
    "Content-Type": "application/json",
  },
  groupId: "web_es_cohort_03",
});

export default api;
