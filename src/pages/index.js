//импорт
import './index.css';
import initialCards from "../utils/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  galleryList,
  configFormValidate,
  popupFormEditProfile,
  popupFormAddPhoto,
	buttonEdit,
	inputName,
	inputProfession,
	profileName,
	profileProfession,
	popupEdit,
	buttonAddCard,
	popupAdd,
	formPopupAdd,
	formPopupEdit
} from "../utils/constants.js";
// отключаем transition при загрузки страницы
const initPreload = () => {
	document.addEventListener('DOMContentLoaded', () => {
		document.body.classList.remove('preload');
	});
};

const initCards = (initialCards) => {
  initialCards.forEach(initCard => {
		const { name, link } = initCard;
		const cardNode = generateCard(name, link);
		galleryList.prepend(cardNode);
  });
}

const clickEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

const clickOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const handlerClickPopupButtonClose = (evt) => {
	const popup = evt.target.closest('.popup');
	closePopup(popup);
};


export const openPopup = (popup) => {
	const popupButtonClose = popup.querySelector('.popup__button-close');

  popup.classList.add("popup_opened");
  document.addEventListener("keydown", clickEsc);
  popup.addEventListener("mousedown", clickOverlay);
	popupButtonClose.addEventListener('click', handlerClickPopupButtonClose);
}; 

const closePopup = (popup) => {
	const popupButtonClose = popup.querySelector('.popup__button-close');

  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", clickEsc);
  popup.removeEventListener("mousedown", clickOverlay);
	popupButtonClose.removeEventListener('click', handlerClickPopupButtonClose);
};

const initSubmitHandlerFormAddCard = (formElement, options) => {

	const {
		galleryList,
		popupAdd,
		formValidatorAddPhoto,
	} = options;

	const inputTitle = formElement.querySelector('.popup__input-title');
	const inputLink = formElement.querySelector('.popup__input-link');

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();

		const name = inputTitle.value;
		const link = inputLink.value;
		const cardNode = generateCard(name, link);

		formElement.reset();
		formValidatorAddPhoto.disableButton();
		galleryList.prepend(cardNode);
		closePopup(popupAdd);
	});
};

function generateCard(name, link) {
	const card = new Card({ name, link }, "#card-template");
	const cardNode = card.generateCard();

	return cardNode;
}

const initEventListenersPopupAddCard = (buttonAddCard, popupAdd) => {
	buttonAddCard.addEventListener("click", () => {
		openPopup(popupAdd);
	});
};

const initEventListenersPopupEditProfile = (buttonEdit, popupEdit, options) => {

	const {
		inputName,
		inputProfession,
		profileName,
		profileProfession
	} = options;

	buttonEdit.addEventListener("click", () => {
		inputName.value = profileName.textContent;
  	inputProfession.value = profileProfession.textContent;
		openPopup(popupEdit);
	});
};

const initSubmitHandlerFormEditProfile = (formElement, options) => {

	const inputName = formElement.querySelector('.popup__input-name');
	const inputProfession = formElement.querySelector('.popup__input-profession');

	const {
		profileName,
		profileProfession,
		popupEdit,
		formValidatorEditProfile
	} = options;

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();

		profileName.textContent = inputName.value;
		profileProfession.textContent = inputProfession.value;
		formValidatorEditProfile.disableButton();
		closePopup(popupEdit);
	});

};

initPreload();

//Валидации формы редактирования профиля
const formValidatorEditProfile = new FormValidator(configFormValidate, popupFormEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddPhoto = new FormValidator(configFormValidate, popupFormAddPhoto);
formValidatorAddPhoto.enableValidation();

initCards(initialCards);

initEventListenersPopupAddCard(buttonAddCard, popupAdd);
initSubmitHandlerFormAddCard(formPopupAdd, {
	galleryList,
	popupAdd,
	formValidatorAddPhoto,
	configFormValidate
});

initEventListenersPopupEditProfile(buttonEdit, popupEdit, {
	inputName,
	inputProfession,
	profileName,
	profileProfession
});
initSubmitHandlerFormEditProfile(formPopupEdit, {
	profileName,
	profileProfession,
	popupEdit,
	configFormValidate,
	formValidatorEditProfile
});
