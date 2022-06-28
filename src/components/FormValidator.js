export class FormValidator {
	_config = null;
	_formElement = null;
	_buttonSubmit =null;

	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
		this._buttonSubmit = this._formElement.querySelector(this._config.submitButtonSelector);
	}

	enableValidation() {
		this._setEventListeners(this._config, this._formElement);
	}

	_setInputValid(config, errorMessage, input) {
		errorMessage.textContent = "";
	}

	_setInputInvalid(config, errorMessage, input) {
		errorMessage.textContent = input.validationMessage;
	}

	_checkInputValidity(config, form, input) {
		const errorMessage = form.querySelector(`#error-${input.id}`);
		if (input.validity.valid) {
			this._setInputValid(config, errorMessage, input);
		} else {
			this._setInputInvalid(config, errorMessage, input);
		}
	}

	_hasInvalidInput(inputList) {
		return inputList.some((input) => {
			return !input.validity.valid;
		});
	}

	disableButton() {
		this._buttonSubmit.disabled = true;
		this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
	}

	_enableButton() {
		this._buttonSubmit.disabled = false;
		this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
	}

	_toggleButtonState(inputList) {
		if (this._hasInvalidInput(inputList)) {
			this.disableButton();
		} else {
			this._enableButton();
		}
	}

	_setEventListeners(config, formElement) {
		const inputList = Array.from(
			formElement.querySelectorAll(config.inputSelector)
		);
		
		inputList.forEach((input) => {
			input.addEventListener("input", () => {
				this._checkInputValidity(config, formElement, input);
				this._toggleButtonState(inputList);
			});
		});
	}
}