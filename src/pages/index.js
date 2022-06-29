//импорт
import './index.css';
import {initialCards} from '../utils/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
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
	buttonAddCard,
} from "../utils/constants.js";

// отключаем transition при загрузке страницы
const initPreload = () => {
	document.addEventListener('DOMContentLoaded', () => {
		document.body.classList.remove('preload');
	});
};

// вставлять в попап картинку с src изображения и подписью к картинке
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

const generateCard = (name, link) => {
	const card = new Card({ name, link }, "#card-template", handleCardClick);
	const cardNode = card.generateCard();

	return cardNode;
};

const initEventListenersPopupAddCard = (buttonAddCard, popupAddCardWithForm) => {
	buttonAddCard.addEventListener("click", () => {
		popupAddCardWithForm.open();
	});
};

const initEventListenersPopupEditProfile = (buttonEdit, popupEditProfileWithForm, options) => {

	const {
		inputName,
		inputProfession,
		profileName,
		profileProfession
	} = options;

	buttonEdit.addEventListener("click", () => {
		inputName.value = profileName.textContent;
  	inputProfession.value = profileProfession.textContent;
		popupEditProfileWithForm.open();
	});
};





initPreload();

const userInfo = new UserInfo('.profile__name', '.profile__profession');

const popupWithImage = new PopupWithImage('.popup_show-photo');
popupWithImage.setEventListeners();

const popupEditProfileWithForm = new PopupWithForm('.popup_edit-profile', ({name, profession}) => {
	userInfo.setUserInfo({ name: name, info: profession });
});
popupEditProfileWithForm.setEventListeners();

const popupAddCardWithForm = new PopupWithForm('.popup_add-photo', ({title, link}) => {
	const cardNode = generateCard(title, link);
	galleryList.prepend(cardNode);
});
popupAddCardWithForm.setEventListeners();

//Валидации формы редактирования профиля
const formValidatorEditProfile = new FormValidator(configFormValidate, popupFormEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddPhoto = new FormValidator(configFormValidate, popupFormAddPhoto);
formValidatorAddPhoto.enableValidation();

const section = new Section({items: initialCards, renderer: ({name, link}) => {
	const cardNode = generateCard(name, link);
	section.addItem(cardNode);
}, selector: '.gallery__list' });
section.renderItems();

initEventListenersPopupAddCard(buttonAddCard, popupAddCardWithForm);

initEventListenersPopupEditProfile(buttonEdit, popupEditProfileWithForm, {
	inputName,
	inputProfession,
	profileName,
	profileProfession
});
