import { displayingLikeCard, deleteLikeCard } from "./api";

// переменные
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export const addCard = (
  cardData,
  deleteCallBack,
  like,
  openPopupImage,
  deleteCardFromDOM,
  profileId
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__likes").textContent = cardData.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const isMyCard = cardData.owner._id === profileId;

  if (isLikeMine(cardData, profileId)) {
    buttonLike.classList.add("card__like-button_is-active");
  } else {
    buttonLike.classList.remove("card__like-button_is-active");
  }

  if (!isMyCard) {
    deleteButton.classList.add("card__delete-button__hidden");
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCallBack(cardData._id);
      deleteCardFromDOM(cardElement);
    });
  }
  buttonLike.addEventListener("click", () => {
    like(cardData, profileId, cardElement);
  });

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openPopupImage(cardData.name, cardData.link);
  });

  return cardElement;
};

// Функция удаления карточки из DOM
export const deleteCard = (cardElement) => {
  cardElement.remove();
};

// функция лайка карточки
export const like = (cardData, profileId, cardElement) => {
  const cardLikes = cardElement.querySelector(".card__likes");
  const buttonLike = cardElement.querySelector(".card__like-button");
  if (isLikeMine(cardData, profileId)) {
    deleteLikeCard(cardData._id)
      .then((res) => {
        cardLikes.textContent = res.likes.length;
        buttonLike.classList.remove("card__like-button_is-active");
        cardData.likes = res.likes;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    displayingLikeCard(cardData._id)
      .then((res) => {
        cardLikes.textContent = res.likes.length;
        buttonLike.classList.add("card__like-button_is-active");
        cardData.likes = res.likes;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// функция проверки лайка
const isLikeMine = (cardData, profileId) => {
  return cardData.likes.some((item) => item._id === profileId);
};
