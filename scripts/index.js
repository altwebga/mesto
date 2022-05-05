//импорт
import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//переменные
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAddCard = profile.querySelector(".profile__button-add");
const gallery = document.querySelector(".gallery__list");
const cardTemplate = document.querySelector("#card-template").content;
const popupEdit = document.querySelector("#popup-edit-profile");
const formPopupEdit = popupEdit.querySelector(".popup__form");
const inputName = popupEdit.querySelector("#name");
const inputProfession = popupEdit.querySelector("#profession");
const popupAdd = document.querySelector("#popup-add-photo");
const formPopupAdd = popupAdd.querySelector(".popup__form");
const inputTitle = popupAdd.querySelector("#title");
const inputLink = popupAdd.querySelector("#link");
const popupShow = document.querySelector("#popup-show-photo");
const popupImage = popupShow.querySelector(".popup__image");
const popupCaption = popupShow.querySelector(".popup__caption");
//конфигурация
const configFormValidate= {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible",
};

//Валидации формы редактирования профиля
const formProfileValidate = new FormValidator(configFormValidate, popupEdit);
formProfileValidate.enableValidation();

//Валидации формы добавления карточки
const formAddCardValidate = new FormValidator(configFormValidate, popupAdd);
formAddCardValidate.enableValidation();

//Функция отрисовки карточек из исходного массива
initialCards.forEach(initCard => {
  const createdCard = new Card(initCard, '#cards-template');
  renderCard(createdCard.generateCard(), cardList);
});

const createCards = (cards) =>
  cards.reverse().forEach((card) => gallery.append(createCardElement(card)));

const addCard = () => {
  const newCardData = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  gallery.prepend(createCardElement(newCardData));
};

const editProfileData = () => {
  const name = inputName.value;
  const profession = inputProfession.value;

  if (name !== profileName.textContent) {
    profileName.textContent = name;
  }
  if (profession !== profileProfession.textContent) {
    profileProfession.textContent = profession;
  }
};

const processProfileEditForm = (evt) => {
  evt.preventDefault();
  editProfileData();
  closePopup(popupEdit);
};

const sendingFormChanges = (evt, configFormValidate) => {
  const formNode = evt.target;
  const buttonFormNode = formNode.querySelector(configFormValidate.submitButtonSelector);

  evt.preventDefault();
  addCard();
  formNode.reset();
  disableButton(configFormValidate.inactiveButtonClass, buttonFormNode);
  closePopup(popupAdd);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
  popup.addEventListener("mousedown", closeClick);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
  popup.removeEventListener("mousedown", closeClick);
};

const closeEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

const closeClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopup(popupEdit);
};

const openAddPhotoPopup = () => openPopup(popupAdd);



const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddPhotoPopup);
popupImage.addEventListener("click", openShowPhotoPopup);

formPopupEdit.addEventListener("submit", processProfileEditForm);
formPopupAdd.addEventListener("submit", (evt) => {
  sendingFormChanges(evt, configFormValidate);
});

createCards(initialCards);
enableValidation(configFormValidate);
