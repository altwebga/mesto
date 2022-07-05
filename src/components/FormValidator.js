export class FormValidator {
  constructor(options, form) {
    this.options = options;
    this.inputSelector = this.options.inputSelector;
    this.submitButtonSelector = this.options.submitButtonSelector;
    this.inactiveButtonClass = this.options.inactiveButtonClass;
    this.inputErrorClass = this.options.inputErrorClass;
    this.errorClass = this.options.errorClass;
    this.form = form;
    this.buttonElement = this.form.querySelector(this.submitButtonSelector);
    this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this.buttonElement.classList.add(this.inactiveButtonClass);
    this.buttonElement.disabled = true;
  }

  enableButton() {
    this.buttonElement.classList.remove(this.inactiveButtonClass);
    this.buttonElement.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this.enableButton();
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
  }
}
