import "../pages/index.css";
import {
  openPopup,
  closePopup,
  handleClosePopupClickOverlay,
  handleClosePopupClickCross,
} from "./modal";
import { addCard, deleteCard, like } from "./card";
import { clearValidation, enableValidation } from "./validation";
import {
  getUserInformation,
  updateProfile,
  getInitialCards,
  addNewCard,
  deleteCardData,
  editAvatar,
  renderLoading,
} from "./api";

// DOM узлы
const page = document.querySelector(".page");
const placesList = document.querySelector(".places__list");

// Для форм
const formElementNewCard = document.querySelector("[name='new-place']");
const formEditProfile = document.querySelector("[name='edit-profile']");
const formEditAvatar = document.querySelector("[name='edit-avatar']");
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
const inputEditAvatar = document.querySelector(".popup__input_type_avatar");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Для  модальных окон
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonChangeAvatar = document.querySelector(".profile__image");
const buttonPopupClose = document.querySelectorAll(".popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupChangeAvatar = document.querySelector(".popup_type_avatar");

// Для  модального окна с изображениями
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");

// функция открытия изображения
export const openPopupImage = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
};

// функция открытия модального окна с редактированием профиля
const handleOpenPopupClickEditProfile = () => {
  clearValidation(validationConfig, formEditProfile);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
  openPopup(popupEdit);
};

// функция открытия модального окна с добавлением карточки
const handleOpenPopupClickAddCard = () => {
  clearValidation(validationConfig, formElementNewCard);
  formElementNewCard.reset();
  openPopup(popupNewCard);
};

// функция открытия модального окна с изменением аватара
const handleOpenPopupClickEditAvatar = () => {
  clearValidation(validationConfig, formEditAvatar);
  openPopup(popupChangeAvatar);
};

// функция для редактирования профиля
const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();
  renderLoading(true);
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  updateProfile();
  closePopup(popupEdit);
};

// функция для добавления новой карточки через модальное окно
const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();
  renderLoading(true);
  const inputUrlFormAddNewCardValue = inputUrlFormAddNewCard.value;
  const inputNameFormAddNewCardValue = inputNameFormAddNewCard.value;
  const dataNewCard = {
    name: inputNameFormAddNewCardValue,
    link: inputUrlFormAddNewCardValue,
  };
  addNewCard(dataNewCard);
  closePopup(popupNewCard);
  formElementNewCard.reset();
};

// функция изменения аватара через модальное окно
const handleFormSubmitEditAvatar = (evt) => {
  evt.preventDefault();
  renderLoading(true);
  closePopup(popupChangeAvatar);
  const link = inputEditAvatar.value;
  editAvatar(link);

  formEditAvatar.reset();
};

// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

enableValidation(validationConfig);

// Слушатели
formEditProfile.addEventListener("submit", handleFormSubmitEditProfile);
formElementNewCard.addEventListener("submit", handleFormSubmitNewCard);
formEditAvatar.addEventListener("submit", handleFormSubmitEditAvatar);
buttonChangeAvatar.addEventListener("click", handleOpenPopupClickEditAvatar);
buttonEdit.addEventListener("click", handleOpenPopupClickEditProfile);
buttonAdd.addEventListener("click", handleOpenPopupClickAddCard);

Array.from(buttonPopupClose).forEach((button) => {
  button.addEventListener("click", handleClosePopupClickCross);
});
page.addEventListener("click", handleClosePopupClickOverlay);

// загрузка карточек на страницу
export let profileId = "";
Promise.all([getUserInformation(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileId = profileData._id;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;

    cardsData.forEach((item) => {
      const newCard = addCard(
        item,
        deleteCardData,
        like,
        openPopupImage,
        deleteCard,
        profileId
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
