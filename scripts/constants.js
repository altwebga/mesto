//переменные
export const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileProfession = profile.querySelector(".profile__profession");
export const buttonEdit = profile.querySelector(".profile__button-edit");
export const buttonAddCard = profile.querySelector(".profile__button-add");
export const galleryList = document.querySelector(".gallery__list");
export const cardTemplate = document.querySelector("#card-template").content;
export const popupEdit = document.querySelector("#popup-edit-profile");
export const formPopupEdit = popupEdit.querySelector(".popup__form");
export const inputName = popupEdit.querySelector("#name");
export const inputProfession = popupEdit.querySelector("#profession");
export const popupAddCard = document.querySelector("#popup-add-card");
export const formPopupAdd = popupAddCard.querySelector(".popup__form");
export const popupInputTitle = popupAddCard.querySelector(".popup__input-title");
export const popupInputLink = popupAddCard.querySelector(".popup__input-link");
export const popupShow = document.querySelector("#popup-show-card");
export const popupImage = popupShow.querySelector(".popup__image");
export const popupCaption = popupShow.querySelector(".popup__caption");
export const popupFormEditProfile = document.querySelector(".popup__form_edit-profile");
export const popupFormAddCard = popupAddCard.querySelector(".popup__form_add-card");
//конфигурация
export const configFormValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible",
};
