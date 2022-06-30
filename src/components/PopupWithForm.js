/*
Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/

import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
	_form = null;
	_callback = null;
	_inputValues = null;
	_popupButtonSave = null;

	constructor(selector, callback) {
		super(selector);
		this._callback = callback;
		this._form = this._popup.querySelector('.popup__form');
		this._popupButtonSave = this._popup.querySelector('.popup__button-save');
		this._inputsList = this._form.querySelectorAll('.popup__input');
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', this._handlerSubmitPopupForm);
	}

	close() {
		super.close();
		this._form.reset();
		this._disableButton();
	}

	_getInputValues() {
		this._inputValues = {};

		for (const input of this._inputsList) {
			this._inputValues[input.name] = input.value;
		}

		return this._inputValues;
	}

	_handlerSubmitPopupForm = (event) => {
		event.preventDefault();
		this._callback(this._getInputValues());
		this.close();
	}

	_disableButton() {
		this._popupButtonSave.classList.add('popup__button-save_disabled');
		this._popupButtonSave.disabled = true;
	}
}
