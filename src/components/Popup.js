export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleСloseByEscape = this._handleСloseByEscape.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener("keyup", this._handleСloseByEscape);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleСloseByEscape);
  }

  setEventListeners() {
    this._handleCloseByOverlay();
    this._handleCloseByButton();
  }

  _handleСloseByEscape(e) {
    if (e.code === "Escape") {
      this.close();
    }
  }

  _handleCloseByOverlay() {
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup")) {
        this.close();
      }
    });
  }

  _handleCloseByButton() {
    this.buttonClose = this._popup.querySelector(".popup__close");

    this.buttonClose.addEventListener("click", () => {
      this.close();
    });
  }
}
