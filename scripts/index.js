//импорт
import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  profile,
  profileName,
  profileProfession,
  buttonEdit,
  buttonAddCard,
  galleryList,
  cardTemplate,
  popupEdit,
  formPopupEdit,
  inputName,
  inputProfession,
  popupAdd,
  formPopupAdd,
  inputTitle,
  inputLink,
  popupShow,
  popupImage,
  popupCaption,
  configFormValidate,
  popupFormEditProfile,
  popupFormAddPhoto
} from "./constants.js";
import Preload from "./Preload.js";

new Preload();

//Валидации формы редактирования профиля
const formValidatorEditProfile = new FormValidator({
  config: configFormValidate,
  formElement: popupFormEditProfile,
  callbackSubmit: (data) => {
    editProfileData(data);
    closePopup(popupEdit);
  }
});

//Валидации формы добавления карточки
const formValidatorAddPhoto = new FormValidator({
  config: configFormValidate,
  formElement: popupFormAddPhoto,
  callbackSubmit: (data) => {
    const dataModif = { name: data.title, link: data.link };
    popupFormAddPhoto.reset();
    closePopup(popupAdd);
    const card = new Card(dataModif, '#card-template', galleryList);
  }
});

//Функция отрисовки карточек из исходного массива

function initCards(initialCards) {
  initialCards.forEach(initCard => {
    const card = new Card(initCard, '#card-template', galleryList);
  });
}

initCards(initialCards);

const editProfileData = (data) => {
  const { name, profession } = data;

  if (name !== profileName.textContent) {
    profileName.textContent = name;
  }
  if (profession !== profileProfession.textContent) {
    profileProfession.textContent = profession;
  }
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
// popupImage.addEventListener("click", openShowPhotoPopup);

// formPopupEdit.addEventListener("submit", processProfileEditForm);
// formPopupAdd.addEventListener("submit", (evt) => {
//   sendingFormChanges(evt, configFormValidate);
// });

// createCards(initialCards);
// enableValidation(configFormValidate);
