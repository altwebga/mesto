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
	popupInputTitle,
	popupInputLink,
	popupFormAddCard
} from "./constants.js";
import Preload from "./Preload.js";
import PopupAddCard from "./PopupAddCard.js";

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
	});
}

initCards(initialCards);

// formPopupEdit.addEventListener("submit", processProfileEditForm);
// formPopupAdd.addEventListener("submit", (evt) => {
//   sendingFormChanges(evt, configFormValidate);
// });



const instancePopupAddCard = new PopupAddCard(popupAddCard, buttonAddCard, {
	form: popupFormAddCard
});
instancePopupAddCard.init();

const instancePopupEditProfile = new PopupEditProfile(popupEdit, buttonEdit, {
	inputName, inputProfession, profileName, profileProfession
});
instancePopupEditProfile.init();
