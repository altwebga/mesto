export default class Popup {
	_buttonClose = null;
	_popup = null;
	_buttonOpen = null;
	_buttonSave = null;

	constructor(popup, buttonOpen) {
		this._popup = popup;
		this._buttonOpen = buttonOpen;
		this._buttonClose = popup.querySelector('.popup__button-close');
		this._buttonSave = this._popup.querySelector('.popup__button-save');
	}

	init() {
		this._setEventListeners();
	}

	_setEventListeners() {
		this._buttonOpen.addEventListener('click', () => {
			this._openPopup();
		});

		this._buttonClose.addEventListener('click', () => {
			this._closePopup();
		});
	}

	_openPopup() {
		this._popup.classList.add("popup_opened");
		document.addEventListener("keydown", this._closeEsc);
		this._popup.addEventListener('click', this._clickOverlay);
		this._openPopupExtraFunc();
	}

	_openPopupExtraFunc() {

	}

	_closePopup() {
		this._popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._closeEsc);
		this._popup.removeEventListener('click', this._clickOverlay);
		this._closePopupExtraFunc();
	}

	_closePopupExtraFunc() {

	}


	_closeEsc = (evt) => {
		if (evt.key === "Escape") {
			this._closePopup();
		}
	}

	_clickOverlay = (evt) => {
		if (evt.target === evt.currentTarget) {
			this._closePopup(evt.currentTarget);
		}
	}

	_disableButtonSave() {
		this._buttonSave.classList.add('popup__button-save_disabled');
		this._buttonSave.disabled = true;
	}

}
