const setInputValid = (config, errorMessage, input) => {
  errorMessage.textContent = "";
  input.classList.remove(config.inputErrorClass);
};

const setInputInvalid = (config, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

const checkInputValidity = (config, form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`);
  if (input.validity.valid) {
    setInputValid(config, errorMessage, input);
  } else {
    setInputInvalid(config, errorMessage, input);
  }
};

const isValid = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const setEventListeners = (config, form) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(config, form, input);
      setButtonState(config, inputList, button);
    });
  });
};
const enableButton = (button, inactiveButtonClass) => {
  button.removeAttribute("disabled");
  button.classList.remove(inactiveButtonClass);
};

const disableButton = (button, inactiveButtonClass) => {
  button.setAttribute("disabled");
  button.classList.add(inactiveButtonClass);
};

const setButtonState = (config, inputList, button) => {
  if (isValid(inputList)) {
    disableButton = (button, inactiveButtonClass);
  } else {
    enableButton = (button, inactiveButtonClass);
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(config, form);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible",
});
