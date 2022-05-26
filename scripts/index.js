//импорт
import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from './Popup.js';
import PopupEditProfile from './PopupEditProfile.js';
import {
	profileName,
	profileProfession,
	buttonEdit,
	galleryList,
	popupEdit,
	inputName,
	inputProfession,
	configFormValidate,
	popupFormEditProfile,
	popupAddCard,
	buttonAddCard,
	popupShowCard,
	popupInputTitle,
	popupInputLink,
	popupFormAddCard
} from "./constants.js";
import Preload from "./Preload.js";
import PopupAddCard from "./PopupAddCard.js";
import PopupPhotoCard from "./PopupPhotoCard.js";
import FormHandlerAddCard from "./FormHandlerAddCard.js";
import FormHandlerEditProfile from "./FormHandlerEditProfile.js";

new Preload();

//Валидации формы редактирования профиля
const formValidatorEditProfile = new FormValidator(configFormValidate, popupFormEditProfile);
formValidatorEditProfile.enableValidation();
//Валидации формы добавления карточки
const formValidatorAddCard = new FormValidator(configFormValidate, popupFormAddCard);
formValidatorAddCard.enableValidation();

//Функция отрисовки карточек из исходного массива
function initCards(initialCards) {
	initialCards.forEach((initCard) => {
		const card = new Card(
			initCard,
			"#card-template"
		);
		const cardNode = card.generateCard();
		galleryList.prepend(cardNode);
		const cardImageNode = cardNode.querySelector('.card__image');
		const instancePopupPhotoCard = new PopupPhotoCard(popupShowCard, cardImageNode, {
			cardNode
		});
		instancePopupPhotoCard.init();
	});
}

initCards(initialCards);

const instancePopupAddCard = new PopupAddCard(popupAddCard, buttonAddCard, {
	form: popupFormAddCard
});
instancePopupAddCard.init();

const instancePopupEditProfile = new PopupEditProfile(popupEdit, buttonEdit, {
	inputName, inputProfession, profileName, profileProfession
});
instancePopupEditProfile.init();


const instanceFormHandlerAddCard = new FormHandlerAddCard(popupFormAddCard, {
	galleryList,
	instancePopupAddCard,
	popupShowCard
});
instanceFormHandlerAddCard.init();

const instanceFormHandlerEditProfile = new FormHandlerEditProfile(popupFormEditProfile, {
	profileName,
	profileProfession,
	instancePopupEditProfile
});
instanceFormHandlerEditProfile.init();

