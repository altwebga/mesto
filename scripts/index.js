//импорт
import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  galleryList,
  popupShow,
  configFormValidate,
  popupFormEditProfile,
  popupFormAddPhoto,
	buttonEdit,
	inputName,
	inputLink,
	inputProfession,
	inputTitle,
	profile,
	profileName,
	profileProfession,
	popupEdit,
	buttonAddCard,
	popupAdd,
	formPopupAdd,
	formPopupEdit
} from "./constants.js";

const initPreload = () => {
	document.addEventListener('DOMContentLoaded', () => {
		document.body.classList.remove('preload');
	});
};

const initCards = (initialCards) => {
  initialCards.forEach(initCard => {
    const card = new Card(initCard, '#card-template', galleryList);
		const cardNode = card.generateCard();
		galleryList.prepend(cardNode);
		initEventListenersPopupForCard(cardNode);
  });
}

// установка слушателей события для картинки карточки, которая открывает popup
const initEventListenersPopupForCard = (cardNode) => {
	const cardImageNode = cardNode.querySelector('.card__image');
	cardImageNode.addEventListener('click', openPopupCard);
};

const openPopupCard = (evt) => {
	const cardNode = evt.target.closest('.card');
	const cardImageNode = evt.target;
	const cardTitleNode = cardNode.querySelector('.card__title');
	const popup = popupShow;
	const popupImageNode = popup.querySelector('.popup__image');
	const popupTextNode = popup.querySelector('.popup__caption');

	popupImageNode.src = cardImageNode.src;
	popupImageNode.alt = cardImageNode.alt;
	popupTextNode.textContent = cardTitleNode.textContent;

	openPopup(popup);
};

// const editProfileData = (data) => {
//   const { name, profession } = data;

//   if (name !== profileName.textContent) {
//     profileName.textContent = name;
//   }
//   if (profession !== profileProfession.textContent) {
//     profileProfession.textContent = profession;
//   }
// };

const handlerClickPopupButtonClose = (evt) => {
	const popup = evt.target.closest('.popup');
	closePopup(popup);
};

const openPopup = (popup) => {
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

const initSubmitHandlerFormAddCard = (formElement, options) => {

	const {
		galleryList,
		popupAdd
	} = options;

	const inputTitle = formElement.querySelector('.popup__input-title');
	const inputLink = formElement.querySelector('.popup__input-link');
	const buttonSubmit = formElement.querySelector('.popup__button-save');

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();

		const name = inputTitle.value;
		const link = inputLink.value;
		const card = new Card({ name, link }, "#card-template");
		const cardNode = card.generateCard();

		formElement.reset();
		initEventListenersPopupForCard(cardNode);
		disableButton(configFormValidate.inactiveButtonClass, buttonSubmit);
		galleryList.prepend(cardNode);
		closePopup(popupAdd);
	});
};

const initEventListenersPopupAddCard = (buttonAddCard, popupAdd) => {
	buttonAddCard.addEventListener("click", () => {
		openPopup(popupAdd);
	});
};

const disableButton = (inactiveButtonClass, button) => {
	button.disabled = true;
	button.classList.add(inactiveButtonClass);
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
	const buttonSubmit = formElement.querySelector('.popup__button-save');

	const {
		profileName,
		profileProfession,
		popupEdit,
		configFormValidate,
	} = options;

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();

		profileName.textContent = inputName.value;
		profileProfession.textContent = inputProfession.value;
		disableButton(configFormValidate.inactiveButtonClass, buttonSubmit);
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
	popupAdd
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
	configFormValidate
});
