const showInputError = (inputSelector, errorClass,inputErrorClass) => {
	inputSelector.classList.add(inputErrorClass)
  inputSelector.classList.add(errorClass);
};

const hideInputError = (inputSelector,errorClass,inputErrorClass) =>{
	inputSelector.classList.add(inputErrorClass)
	inputSelector.classList.remove(errorClass);
}

const checkInputValidity = (inputSelector,errorClass,inputErrorClass) =>{
	if(!inputSelector.validity.valid){
		showInputError(inputSelector,errorClass,inputErrorClass)
	} else {
		hideInputError(inputSelector,errorClass,inputErrorClass)
	}
}

const hasInputError = (inputList) =>{
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid
	})
}

const toggleButtonState = (inputList,submitButtonSelector,inactiveButtonClass) =>{
	if(hasInputError(inputList)){
		submitButtonSelector.disabled = true;
		submitButtonSelector.classList.add(inactiveButtonClass);
	} else {
		submitButtonSelector.disabled = false;
		submitButtonSelector.classList.remove(inactiveButtonClass);
	}
}

const setEventListeners = (inputSelector,errorClass,formSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass) => {
	const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
	toggleButtonState(inputList,submitButtonSelector,inactiveButtonClass);
	inputList.forEach((inputElement)=>{
		inputElement.addEventListener('input',()=>{
			checkInputValidity(inputElement,errorClass,inputErrorClass);
			toggleButtonState(inputList,submitButtonSelector,inactiveButtonClass);
		})
	})
}

const enableValidation = (inputSelector,errorClass,formSelector,inactiveButtonClass,submitButtonSelector) => {
	const formList = Array.from(document.querySelectorAll(formSelector))
	formList.forEach((formElement)=>{
		formElement.addEventListener('submit',(evt)=>{
			evt.preventDefault()
		})
		setEventListeners(inputSelector,inputErrorClass,errorClass,formSelector,submitButtonSelector,inactiveButtonClass)
	})
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 