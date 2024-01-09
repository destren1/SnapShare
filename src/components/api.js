// конфиг
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "d4c57d4c-4f15-4847-b301-7791a477003b",
    "content-type": "application/json",
  },
};

// функция получения данных из ответа
const getResponseData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка:${(res.status, res.statusText)}`);
};

// функция подгрузки name,about,avatar с сервера
export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      Authorization: config.headers.authorization,
    },
  }).then(getResponseData);
};

// сохранение отредактированных данных пользователя на сервере
export const updateProfile = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(getResponseData);
};

// функция подгрузки карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      Authorization: config.headers.authorization,
    },
  }).then(getResponseData);
};

// добавление новой карточки с сохранением на сервере
export const addNewCard = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
  }).then(getResponseData);
};

// удаление данных карточки с сервера
export const deleteCardData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

// постановка лайка
export const displayingLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData);
};

// удаление лайка
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

// изменение аватара
export const editAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(getResponseData);
};

// функция улучшения UX, пока данные загружаются
export const renderLoading = (isLoading, buttonSubmit) => {
  if (isLoading) {
    buttonSubmit.textContent = "Сохранение...";
  } else {
    buttonSubmit.textContent = "Сохранить";
  }
};
