const popups = document.querySelectorAll('.popup'),
  popupImage = document.querySelector('.popup_img'),
  popupCards = document.querySelector('.popup_edit_card'),
  formAddCards = popupCards.querySelector('.popup__form_add_card'),
  titleInput = formAddCards.querySelector('.popup__text_value_title'),
  linkInput = formAddCards.querySelector('.popup__text_value_link'),
  popupProfile = document.querySelector('.popup_edit_profile'),
  formElement = popupProfile.querySelector('.popup__form_edit_profile'),
  nameInput = formElement.querySelector('.popup__text_value_name'),
  descriptionInput = formElement.querySelector('.popup__text_value_descr');

const validatorSettings = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__text_type-error',
  errorClass: 'popup__text-error_active',
};

export {
  popups,
  popupImage,
  popupCards,
  formAddCards,
  titleInput,
  linkInput,
  formElement,
  popupProfile,
  nameInput, 
  descriptionInput,
  validatorSettings
};
