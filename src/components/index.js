import "../pages/index.css";
import {
  openPopup,
  closePopup,
  handleClosePopupClickOverlay,
  handleClosePopupClickCross,
} from "./modal";
import { addCard, deleteCard, like } from "./card";
import { clearValidation, enableValidation } from "./validation";

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
const buttonSave = document.querySelectorAll('.popup__button')
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonChangeAvatar = document.querySelector(".profile__image");
const buttonPopupClose = document.querySelectorAll(".popup__close");
const buttonDelete = document.querySelector(".card__delete-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupChangeAvatar = document.querySelector(".popup_type_avatar");
const popupDeleteCard = document.querySelector(".popup_type_avatar");

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
}

// функция открытия попапа для удаления карточки
const handleOpenPopupClickDeleteCard = () => {
	openPopup(popupDeleteCard);
}

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
}

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
buttonChangeAvatar.addEventListener('click', handleOpenPopupClickEditAvatar);
buttonEdit.addEventListener("click", handleOpenPopupClickEditProfile);
buttonAdd.addEventListener("click", handleOpenPopupClickAddCard);

Array.from(buttonPopupClose).forEach((button) => {
  button.addEventListener("click", handleClosePopupClickCross);
});
page.addEventListener("click", handleClosePopupClickOverlay);





// конфиг
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "d4c57d4c-4f15-4847-b301-7791a477003b",
		"content-type": "application/json"
  },
};

// функция получения данных из ответа
const getResponseData = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка:${err.status,err.statusText}`);

};

// Подгрузка name,about,avatar с сервера
const getUserInformation = () => {
fetch(`${config.baseUrl}/users/me`, {
  headers: {
    Authorization: config.headers.authorization,
  },
})
  .then((res) => getResponseData(res))
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });
}
getUserInformation()

	
	// сохранение отредактированных данных пользователя на сервере 
	const updateProfile = () => {
		fetch(`${config.baseUrl}/users/me`,{
	 method: 'PATCH',
	 headers:{
		 Authorization: config.headers.authorization,
		 'Content-type':config.headers["content-type"]
	 },
	 body: JSON.stringify(
		 {
			 name:profileTitle.textContent,
			 about:profileDescription.textContent
		 }
	 )
 })
 .then(res => getResponseData(res))
 .then((data) => {
	 console.log(`Обновление успешно: ${data}`)
 })
 .catch((err) =>{
	 console.log(err)
 })
 .finally(()=>{
	renderLoading(false)
})
}


// Подгрузка карточек с сервера
const getInitialCards = () => {
fetch(`${config.baseUrl}/cards`, {
  headers: {
    Authorization: config.headers.authorization,
  },
})
  .then((res) => getResponseData(res))
  .then((data) => {
    data.forEach((item) => {
      const newCard = addCard(item, deleteCardData, like, openPopupImage,deleteCard);
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}
getInitialCards()

// добавление новой карточки с сохранением на сервере 
const addNewCard = (newCard) => {
	fetch(`${config.baseUrl}/cards`,{
 method: 'POST',
 headers:{
	 Authorization: config.headers.authorization,
	 'Content-type':config.headers["content-type"]
 },
 body: JSON.stringify(
	 {
		 name:newCard.name,
		 link:newCard.link
	 }
 )
})
.then(res => getResponseData(res))
.then((data) => {
	const newCard = addCard(data, deleteCardData, like, openPopupImage,deleteCard);
  placesList.prepend(newCard);
})
.catch((err) =>{
 console.log(err)
})
.finally(()=>{
	renderLoading(false)
});
}

// удаление данных карточки с сервера
const deleteCardData = (cardId) =>{
	fetch(`${config.baseUrl}/cards/${cardId}`,{
		method: 'DELETE',
		headers:{
			Authorization: config.headers.authorization,
			'Content-type':config.headers["content-type"]
		}
	})
	.then(res => getResponseData(res))
	.then(() => {
		const cardElement = document.getElementById(cardId);
		if (cardElement) {
			cardElement.remove();
		}})
	.catch((err) =>
	console.log(err))
}

// постановка лайка
const likeCard = (cardId,cardData) =>{
	fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
		method: 'PUT',
		headers:{
			Authorization:config.headers.authorization,
			'Content-type':config.headers["content-type"]
		}
	})
	.then(res => getResponseData(res))
	.then(() =>{
		if (evt.target.classList.contains("card__like-button")) {
			evt.target.classList.toggle("card__like-button_is-active");
		}
  	const likes = document.querySelector('.card__likes');
		likes.textContent = cardData.likes.length
	})
	.catch((err)=>{
		console.log(err)
	})
}


// удаление лайка
const deleteLikeCard = () =>{
	fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
		method: 'DELETE',
		headers:{
			Authorization: config.headers.authorization,
			'Content-type':config.headers["content-type"]
		}
	})
	.then(res => getResponseData(res))
	.then((data) =>{
		
	})
	.catch((err)=>{
		console.log(err)
	})
}


// изменение аватара
const editAvatar = (link) => {
	fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers:{
			Authorization : config.headers.authorization,
			'Content-type': config.headers["content-type"]
		},
		body:
			JSON.stringify(
				{
					avatar: link
				}
			)
	})
	.then(res => getResponseData(res))
	.then((data) =>{
		profileAvatar.style.backgroundImage = `url(${data.avatar})`;
	})
	.catch((err)=>{
		console.log(err)
	})
	.finally(()=>{
		renderLoading(false)
	});
}

// функция улучшения UX, пока данные загружаются
const renderLoading = (isLoading) =>{
	if(isLoading){
	buttonSave.forEach((button)=>{
		button.textContent = 'Сохранение...'
	})
	} else {
		buttonSave.forEach((button)=>{
			button.textContent = 'Сохранить'
		})
	}
}