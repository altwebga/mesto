export class FormValidator {
    constructor (config, form) {
      this._input = config.input;
      this._submitButton = config.submitButton;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorTextClass = config.errorTextClass;
      this._form = form;
  
      this._buttonElement = this._form.querySelector(this._submitButton);
      this._inputList = Array.from(this._form.querySelectorAll(this._input));
    }
    _setInputValid = (config, errorMessage, input) => {
        errorMessage.textContent = "";
      };
      
    _setInputInvalid = (config, errorMessage, input) => {
        errorMessage.textContent = input.validationMessage;
      };
      
    _checkInputValidity = (config, form, input) => {
        const errorMessage = form.querySelector(`#error-${input.id}`);
        if (input.validity.valid) {
          setInputValid(config, errorMessage, input);
        } else {
          setInputInvalid(config, errorMessage, input);
        }
      };
      
    _hasInvalidInput = (inputList) => {
        return inputList.some((input) => {
          return !input.validity.valid;
        });
      };
      
    _setEventListeners = (config, form) => {
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));
        const button = form.querySelector(config.submitButtonSelector);
        inputList.forEach((input) => {
          input.addEventListener("input", () => {
            checkInputValidity(config, form, input);
            toggleButtonState(config, inputList, button);
          });
        });
      };
      
    _disableButton = (inactiveButtonClass, button) => {
        button.disabled = true;
        button.classList.add(inactiveButtonClass);
      };
      
    _enableButton = (inactiveButtonClass, button) => {
        button.disabled = false;
        button.classList.remove(inactiveButtonClass);
      };
      
    _toggleButtonState = (config, inputList, button) => {
        if (hasInvalidInput(inputList)) {
          disableButton(config.inactiveButtonClass, button);
        } else {
          enableButton(config.inactiveButtonClass, button);
        }
      };
      
    _enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach((form) => {
          setEventListeners(config, form);
        });
      };
      
}