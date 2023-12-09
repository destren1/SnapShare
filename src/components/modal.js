// Для  модального окна с изображениями
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");

// функция открытия изображения
export const openPopupImage = (evt) => {
  if (evt.target.classList.contains("card__image")) {
    animation(popupTypeImage);
    setTimeout(openPopup, 1, popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  }
};

// функция открытия модального окна
export const openPopup = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
};

// функция закрытия модального окна
export const closePopup = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
};

// анимация модального окна
export const animation = (modal) => {
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
