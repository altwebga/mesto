import Popup from "./Popup.js";

export default class PopupPhotoCard extends Popup {
	_cardNode = null;
	_cardImageNode = null;
	_cardTitleNode = null;
	_popupImageNode = null;
	_popupTextNode = null;

	constructor(popup, buttonOpen, options) {
		super(popup, buttonOpen);

		const { cardNode } = options;

		this._cardNode = cardNode;
		this._cardImageNode = cardNode.querySelector('.card__image');
		this._cardTitleNode = cardNode.querySelector('.card__title');
		this._popupImageNode = this._popup.querySelector('.popup__image');
		this._popupTextNode = this._popup.querySelector('.popup__caption');
	}

	_openPopupExtraFunc() {
		// this._disableButtonSave();
		this._editPopupWithCard();
	}

	_editPopupWithCard() {
		this._popupImageNode.alt = this._cardImageNode.alt;
		this._popupImageNode.src = this._cardImageNode.src;
		this._popupTextNode.textContent = this._cardTitleNode.textContent;
	}

}
