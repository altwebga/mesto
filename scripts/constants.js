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
export const popupAdd = document.querySelector("#popup-add-photo");
export const formPopupAdd = popupAdd.querySelector(".popup__form");
export const inputTitle = popupAdd.querySelector("#title");
export const inputLink = popupAdd.querySelector("#link");
export const popupShow = document.querySelector("#popup-show-photo");
export const popupImage = popupShow.querySelector(".popup__image");
export const popupCaption = popupShow.querySelector(".popup__caption");
export const popupFormEditProfile = document.querySelector(".popup__form_edit-profile");
export const popupFormAddPhoto = document.querySelector(".popup__form_add-photo");
//конфигурация
export const configFormValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible",
};