import "./pages/index.css";
import { initialCards } from "./scripts/cards";

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

const page = document.querySelector(".page");
const editButton = page.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const addButton = page.querySelector(".profile__add-button");
const ButtonClosePopup = document.querySelector(".popup__close");

const openPopup = () => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
};

const closePopup = () => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
};

const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
}; 

page.addEventListener("click", (evt) => {
  if (evt.target === editButton || evt.target === addButton) {
    openPopup();
  } else {
    const popupContent = evt.target.closest(".popup__content");
    if (!popupContent || evt.target === ButtonClosePopup) {
      closePopup();
    }
  }
});


