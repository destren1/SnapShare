import "../pages/index.css";
import { initialCards } from "./cards";
import {
  openPopup,
  closePopup,
  handleClosePopupClickOverlay,
  handleClosePopupClickCross,
} from "./modal";
import { addCard, deleteCard, like } from "./card";

// DOM узлы
const page = document.querySelector(".page");
const placesList = document.querySelector(".places__list");

// Для форм
const formElementNewCard = document.querySelector("[name='new-place']");
const formEditProfile = document.querySelector("[name='edit-profile']");
const inputName = formEditProfile.querySelector(".popup__input_type_name");
const inputJob = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const inputNameFormAddNewCard = formElementNewCard.querySelector(
  ".popup__input_type_card-name"
);
const inputUrlFormAddNewCard = formElementNewCard.querySelector(
  ".popup__input_type_url"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Для  модальных окон
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonPopupClose = document.querySelectorAll(".popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");

// Для  модального окна с изображениями
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");

// функция открытия изображения
const openPopupImage = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
};

// метод добавления на страницу карточки
initialCards.forEach((item) => {
  const newCard = addCard(item, deleteCard, like, openPopupImage);
  placesList.append(newCard);
});

// функция открытия модального окна с редактированием профиля
const handleOpenPopupClickEditProfile = () => {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
  openPopup(popupEdit);
};

// функция открытия модального окна с добавлением карточки
const handleOpenPopupClickAddCard = () => {
  openPopup(popupNewCard);
};

// функция для редактирования профиля
const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  closePopup(popupEdit);
};

// функция для добавления новой карточки через модальное окно
const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();
  const inputUrlFormAddNewCardValue = inputUrlFormAddNewCard.value;
  const inputNameFormAddNewCardValue = inputNameFormAddNewCard.value;
  const dataNewCard = {
    name: inputNameFormAddNewCardValue,
    link: inputUrlFormAddNewCardValue,
  };
    const newCard = addCard(dataNewCard, deleteCard, like, openPopupImage);
    placesList.prepend(newCard);
  closePopup(popupNewCard);
  formElementNewCard.reset();
};

// Слушатели
formEditProfile.addEventListener("submit", handleFormSubmitEditProfile);
formElementNewCard.addEventListener("submit", handleFormSubmitNewCard);
buttonEdit.addEventListener("click", handleOpenPopupClickEditProfile);
buttonAdd.addEventListener("click", handleOpenPopupClickAddCard);
Array.from(buttonPopupClose).forEach((button) => {
  button.addEventListener("click", handleClosePopupClickCross);
});
page.addEventListener("click", handleClosePopupClickOverlay);
