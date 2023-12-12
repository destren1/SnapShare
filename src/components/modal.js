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

// функция закрытия на esc
const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// функция закрытия попапа нажатием на оверлей
export const handleClosePopupClickOverlay = (evt) => {
  const popupCurrent = evt.target.closest(".popup");
  if (evt.target.classList.contains("popup")) {
    closePopup(popupCurrent);
  }
};

// функция закрытия попапа на крестик
export const handleClosePopupClickCross = (evt) => {
  const popupCurrent = evt.target.closest(".popup");
  if (evt.target.classList.contains("popup__close")) {
    if (popupCurrent) {
      closePopup(popupCurrent);
    }
  }
};
