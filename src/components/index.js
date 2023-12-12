import "../pages/index.css";
import { initialCards } from "./cards";
import { openPopup, closePopup, handleClosePopupClickOverlay } from "./modal";
import { addCard, deleteCard, like } from "./card";

// DOM узлы
const page = document.querySelector(".page");
const placesList = document.querySelector(".places__list");

// Для форм
const FormElementNewCard = document.querySelector("[name='new-place']");
const FormEditProfile = document.querySelector("[name='edit-profile']");
const InputName = FormEditProfile.querySelector(".popup__input_type_name");
const InputJob = FormEditProfile.querySelector(
  ".popup__input_type_description"
);
const inputNameFormAddNewCard = FormElementNewCard.querySelector(
  ".popup__input_type_card-name"
);
const inputUrlFormAddNewCard = FormElementNewCard.querySelector(
  ".popup__input_type_url"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Для  модальных окон
const ButtonEdit = document.querySelector(".profile__edit-button");
const ButtonAdd = document.querySelector(".profile__add-button");
const ButtonPopupClose = document.querySelectorAll(".popup__close");
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
  InputName.value = profileTitle.textContent;
  InputJob.value = profileDescription.textContent;
  openPopup(popupEdit);
};

// функция открытия модального окна с добавлением карточки
const handleOpenPopupClickAddCard = () => {
  openPopup(popupNewCard);
};

// функция закрытия попапа на крестик
const handleClosePopupClickCross = (evt) => {
  const PopupCurrent = evt.target.closest(".popup");
  if (evt.target.classList.contains("popup__close")) {
    if (PopupCurrent) {
      closePopup(PopupCurrent);
    }
  }
};

// функция для редактирования профиля
const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = InputName.value;
  profileDescription.textContent = InputJob.value;
  closePopup(popupEdit);
};
FormEditProfile.addEventListener("submit", handleFormSubmitEditProfile);

// функция для добавления новой карточки через модальное окно
const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();
  const inputUrlFormAddNewCardValue = inputUrlFormAddNewCard.value;
  const inputNameFormAddNewCardValue = inputNameFormAddNewCard.value;
  const Card = [
    {
      name: inputNameFormAddNewCardValue,
      link: inputUrlFormAddNewCardValue,
    },
  ];
  Card.forEach((item) => {
    const NewCard = addCard(item, deleteCard, like, openPopupImage);
    placesList.prepend(NewCard);
  });
  closePopup(popupNewCard);
  FormElementNewCard.reset();
};

// Слушатели
FormElementNewCard.addEventListener("submit", handleFormSubmitNewCard);
ButtonEdit.addEventListener("click", handleOpenPopupClickEditProfile);
ButtonAdd.addEventListener("click", handleOpenPopupClickAddCard);
Array.from(ButtonPopupClose).forEach((button) => {
  button.addEventListener("click", handleClosePopupClickCross);
});
page.addEventListener("click", handleClosePopupClickOverlay);
