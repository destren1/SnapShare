import "./pages/index.css";
import { initialCards } from "./components/cards";
import { openPopup, closePopup, animation} from "./components/modal";
import { addCard } from "./components/card";

// DOM узлы
const page = document.querySelector(".page");
const placesList = document.querySelector(".places__list");

// Для форм
const formElement = document.querySelector("[name='edit-profile']");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElementNewCard = document.querySelector("[name='new-place']");

// Для  модальных окон
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");

// функция взаимодействия с модальными окнами
const popupInteractions = (evt) => {
  const currentPopup = evt.target.closest(".popup");
  if (evt.target === editButton) {
    animation(popupEdit);
    setTimeout(openPopup, 1, popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  } else if (evt.target === addButton) {
    animation(popupNewCard);
    setTimeout(openPopup, 1, popupNewCard);
  } else if (evt.target.classList.contains("popup__close")) {
    if (currentPopup) {
      closePopup(currentPopup);
    }
  } else if (!evt.target.closest(".popup__content")) {
    if (currentPopup) {
      closePopup(currentPopup);
    }
  }
};

page.addEventListener("click", popupInteractions);

// функция для редактирования профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
};
formElement.addEventListener("submit", handleFormSubmit);

const cardName = formElementNewCard.querySelector(
  ".popup__input_type_card-name"
);
const url = formElementNewCard.querySelector(".popup__input_type_url");

// функция для добавления новой карточки через модальное окно
const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();

  initialCards.unshift({ name: cardName.value, link: url.value });
  const newCard = addCard(initialCards[0]);
  placesList.prepend(newCard);
  closePopup(popupNewCard);
  formElementNewCard.reset();
};

formElementNewCard.addEventListener("submit", handleFormSubmitNewCard);
