// тэмплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция создания карточки
export const addCard = (cardData, deleteCallBack, like, openPopupImage) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCallBack(cardElement);
  });
  placesList.addEventListener("click", like);
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openPopupImage(cardData.name, cardData.link);
  });

  return cardElement;
};

// лайк
export const like = (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};

// Функция удаления карточки
export const deleteCard = (cardElement) => {
  cardElement.remove();
};
