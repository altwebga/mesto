/*
Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
*/

export class Popup {
	_popup = null;
	_popupButtonClose = null;

	constructor(selector) {
		this._popup = document.querySelector(selector);
		this._popupButtonClose = this._popup.querySelector('.popup__button-close');
	}

	setEventListeners() {
		this._popupButtonClose.addEventListener('mousedown', this._clickPopupButtonClose);
		this._popup.addEventListener('mousedown', this._clickOverlay);
	}

	open() {
		document.addEventListener('keydown', this._handleEscClose);
		this._popup.classList.add('popup_opened');
	}

	close() {
		document.removeEventListener('keydown', this._handleEscClose);
		this._popup.classList.remove('popup_opened');
	}

	_handleEscClose = (event) => {
		if (event.key === "Escape") {
			this.close();
		}
	}

	_clickOverlay = (event) => {
		if (event.target === event.currentTarget) {
			this.close();
		}
	}

	_clickPopupButtonClose = (event) => {
		this.close();
	}
}
