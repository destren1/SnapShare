import { addCard, like, deleteCard } from "./card";
import { openPopupImage, profileId } from "./index";

const buttonSave = document.querySelectorAll(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const placesList = document.querySelector(".places__list");
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
  }).then((res) => getResponseData(res));
};

// сохранение отредактированных данных пользователя на сервере
export const updateProfile = () => {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: config.headers.authorization,
      "Content-type": config.headers["content-type"],
    },
    body: JSON.stringify({
      name: profileTitle.textContent,
      about: profileDescription.textContent,
    }),
  })
    .then((res) => getResponseData(res))
    .then((data) => {
      console.log(`Обновление успешно: ${data}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

// функция подгрузки карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      Authorization: config.headers.authorization,
    },
  }).then((res) => getResponseData(res));
};

// добавление новой карточки с сохранением на сервере
export const addNewCard = (newCard) => {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      Authorization: config.headers.authorization,
      "Content-type": config.headers["content-type"],
    },
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
  })
    .then((res) => getResponseData(res))
    .then((data) => {
      const newCard = addCard(
        data,
        deleteCardData,
        like,
        openPopupImage,
        deleteCard,
        profileId
      );
      placesList.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

// удаление данных карточки с сервера
export const deleteCardData = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: config.headers.authorization,
      "Content-type": config.headers["content-type"],
    },
  })
    .then((res) => getResponseData(res))
    .then(() => {
      const cardElement = document.getElementById(cardId);
      if (cardElement) {
        cardElement.remove();
      }
    })
    .catch((err) => console.log(err));
};

// постановка лайка
export const displayingLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      Authorization: config.headers.authorization,
      "Content-type": config.headers["content-type"],
    },
  }).then((res) => getResponseData(res));
};

// удаление лайка
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: config.headers.authorization,
      "Content-type": config.headers["content-type"],
    },
  }).then((res) => getResponseData(res));
};

// изменение аватара
export const editAvatar = (link) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: config.headers.authorization,
      "Content-type": config.headers["content-type"],
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => getResponseData(res))
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

// функция улучшения UX, пока данные загружаются
export const renderLoading = (isLoading) => {
  if (isLoading) {
    buttonSave.forEach((button) => {
      button.textContent = "Сохранение...";
    });
  } else {
    buttonSave.forEach((button) => {
      button.textContent = "Сохранить";
    });
  }
};
