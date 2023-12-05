import './pages/index.css';
import { initialCards } from './scripts/cards';

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
const addCard = (cardData, deleteCallBack) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCallBack(cardElement);
  });

  return cardElement;
};

// Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove();
};

initialCards.forEach((item) => {
  const newCard = addCard(item, deleteCard);
  placesList.append(newCard);
});

