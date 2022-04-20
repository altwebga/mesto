const setInputValid = (config, errorMessage, input) => {
  errorMessage.textContent = "";
};

const setInputInvalid = (config, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
};

const checkInputValidity = (config, form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`);
  if (input.validity.valid) {
    setInputValid(config, errorMessage, input);
  } else {
    setInputInvalid(config, errorMessage, input);
  }
};

const hasInvalidInput = (inputList) => {
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
      toggleButtonState(config, inputList, button);
    });
  });
};

const disableButton = (inactiveButtonClass, button) => {
  button.disabled = true;
  button.classList.add(inactiveButtonClass);
};

const enableButton = (inactiveButtonClass, button) => {
  button.disabled = false;
  button.classList.remove(inactiveButtonClass);
};

const toggleButtonState = (config, inputList, button) => {
  if (hasInvalidInput(inputList)) {
    disableButton(config.inactiveButtonClass, button);
  } else {
    enableButton(config.inactiveButtonClass, button);
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(config, form);
  });
};
