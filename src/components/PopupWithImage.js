import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popup.querySelector('.popup__image');
    this._popupImageDescription = this._popup.querySelector('.popup__img-descr');
  }

  open(data) {
    super.open();
    this._popupImageElement.src = data.link;
    this._popupImageElement.alt = data.name;

    this._popupImageDescription.textContent = data.name;
  }
}
