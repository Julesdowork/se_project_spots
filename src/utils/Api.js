class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponses(res) {
    if (res.ok) {
      return res.json();
    }

    Promise.reject(`Error: ${res.status}`);
  }

  _request(route, options = { headers: this._headers }) {
    return fetch(`${this._baseUrl}${route}`, options);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getUserInfo() {
    return this._request("/users/me").then(this._checkResponses);
  }

  getInitialCards() {
    return this._request("/cards").then(this._checkResponses);
  }

  editUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponses);
  }

  editAvatarPicture({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponses);
  }

  addNewCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponses);
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponses);
  }

  changeLikeStatus(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponses);
  }
}

export default Api;
