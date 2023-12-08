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

const openPopupImage = (evt) => {
  if (evt.target.classList.contains("card__image")) {
    popupTypeImage.classList.add("popup_is-opened", "popup_is-animated");
    document.addEventListener("keydown", closeOnEsc);
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

const openPopupNewCard = () => {
  popupNewCard.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closeOnEsc);
};

const openPopupEdit = () => {
  popupEdit.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closeOnEsc);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

const closePopup = () => {
  popupEdit.classList.remove("popup_is-opened");
  popupNewCard.classList.remove("popup_is-opened");
  popupTypeImage.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
};
const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
};

const popupInteraction = (evt) => {
  if (evt.target === editButton) {
    openPopupEdit();
  } else if (evt.target === addButton) {
    openPopupNewCard();
  } else if (evt.target.classList.contains("popup__close")) {
    closePopup();
  } else if (!evt.target.closest(".popup__content")) {
    closePopup();
  }
};

page.addEventListener("click", popupInteraction);

//редактирование профиля через форму

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
};

//добавление новой карточки через форму
formElement.addEventListener("submit", handleFormSubmit);

const cardName = formElementNewCard.querySelector(
  ".popup__input_type_card-name"
);
const url = formElementNewCard.querySelector(".popup__input_type_url");

const handleFormSubmitNewCard = (cardNameValue, urlValue) => {
  initialCards.unshift({ name: cardNameValue, link: urlValue });
};

formElementNewCard.addEventListener("submit", (event) => {
  event.preventDefault();

  handleFormSubmitNewCard(cardName.value, url.value);
  const newCard = addCard(initialCards[0]);
  placesList.prepend(newCard);
  closePopup();
  formElementNewCard.reset();
});
