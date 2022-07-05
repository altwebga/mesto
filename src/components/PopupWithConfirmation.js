import Popup from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this.submitButton = this._popup.querySelector(".popup__button");
    this.buttonText = this.submitButton.textContent;
    this.form = this._popup.querySelector("form");
    this.submitButton = this.form.querySelector("button");
    this.handleDeleteCard = handleDeleteCard;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submitButton.textContent = "Удаление...";
      this.handleDeleteCard(this._card.id, this._card);
    });
  }

  setDefaultText() {
    this.submitButton.textContent = this.buttonText;
  }
}
