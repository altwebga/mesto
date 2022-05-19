import Popup from "./Popup.js";

export default class PopupAddCard extends Popup {
	_form = null;
	_popupErrors = null;

	constructor(popup, buttonOpen, options) {
		super(popup, buttonOpen);

		const { form } = options;

		this._popupErrors = this._popup.querySelectorAll(".popup__error");
		this._form = form;
	}

	_openPopupExtraFunc() {
		this._clearForm();
		this._clearErrorMessages();
		this._disableButtonSave();
	}

	_clearForm() {
		this._form.reset();
	}

	_clearErrorMessages() {
		for (const popupError of this._popupErrors) {
			popupError.textContent = "";
		}
	}

	_disableButtonSave() {
		this._buttonSave.classList.add("popup__button-save_disabled");
		this._buttonSave.disabled = true;
	}
}
