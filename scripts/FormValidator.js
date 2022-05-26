export default class FormValidator {
	_config = null;
	_formElement = null;

	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
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

	_disableButton(inactiveButtonClass, button) {
		button.disabled = true;
		button.classList.add(inactiveButtonClass);
	}

	_enableButton(inactiveButtonClass, button) {
		button.disabled = false;
		button.classList.remove(inactiveButtonClass);
	}

	_toggleButtonState(config, inputList, button) {
		if (this._hasInvalidInput(inputList)) {
			this._disableButton(config.inactiveButtonClass, button);
		} else {
			this._enableButton(config.inactiveButtonClass, button);
		}
	}

	// _getInputsValue(inputList) {
	//   const obj = {};
	//   for (const item of inputList) {
	//     obj[item.id] = item.value;
	//   }
	//   return obj;
	// }

	_setEventListeners(config, formElement) {
		const inputList = Array.from(
			formElement.querySelectorAll(config.inputSelector)
		);
		const button = formElement.querySelector(config.submitButtonSelector);
		inputList.forEach((input) => {
			input.addEventListener("input", () => {
				this._checkInputValidity(config, formElement, input);
				this._toggleButtonState(config, inputList, button);
			});
		});

		// formElement.addEventListener('submit', event => {
		//   event.preventDefault();
		//   const inputsValue = this._getInputsValue(inputList);

		//   callbackSubmit(inputsValue);
		//   this._disableButton(config.inactiveButtonClass, button);
		// });
	}
}
