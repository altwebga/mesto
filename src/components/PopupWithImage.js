/*
Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

	constructor(selector) {
		super(selector);
		this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__figcaption');
	}

	open(name, link) {
		this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
	}
}