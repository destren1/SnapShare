import "./pages/index.css";
import { initialCards } from "./scripts/cards";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const page = document.querySelector(".page");
const editButton = page.querySelector(".profile__edit-button");
const addButton = page.querySelector(".profile__add-button");
const popupImage = page.querySelector(".popup__image");
const popupCaption = page.querySelector(".popup__caption");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const formElement = document.querySelector("[name='edit-profile']");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElementNewCard = document.querySelector("[name='new-place']");

// Функция создания карточки
const addCard = (cardData, deleteCallBack, like, openPopupImage) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCallBack(cardElement);
  });
  placesList.addEventListener("click", like);
  document.addEventListener("click", openPopupImage);

  return cardElement;
};

// лайк
const like = (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};
// функция открытия изображения
const openPopupImage = (evt) => {
  if (evt.target.classList.contains("card__image")) {
    animation(popupTypeImage);
    setTimeout(openPopup, 1, popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  }
};

// Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove();
};

initialCards.forEach((item) => {
  const newCard = addCard(item, deleteCard, like, openPopupImage);
  placesList.append(newCard);
});
// функция открытия модального окна
const openPopup = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
};
// функция закрытия модального окна
const closePopup = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
};
const animation = (modal) => {
  modal.classList.add("popup_is-animated");
};
// функция закрытия на esc
const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};
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
