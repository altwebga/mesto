import Popup from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitListener) {
    super(popupSelector);
    this.submitButton = this._popup.querySelector(".popup__button");
    this.buttonText = this.submitButton.textContent;
    this.submitListener = submitListener;
    this.inputs = this._popup.querySelectorAll("input");
    this.form = this._popup.querySelector("form");
    this.inputsValue = {};
  }

  getInputValues() {
    this.inputs.forEach((item) => {
      this.inputsValue[item.name] = item.value;
    });

    return this.inputsValue;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formSubmitListener();
  }

  _formSubmitListener() {
    this.form.addEventListener("submit", (event) => {
      this.submitListener(event);
      this.submitButton.textContent = "Сохранение...";
    });
  }

  close() {
    super.close();
    this._resetForm();
  }

  open() {
    super.open();
    this.setDefaultText();
  }

  _resetForm() {
    this.form.reset();
  }

  setErrorText() {
    this.submitButton.textContent = "Что-то пошло не так...";
  }

  setDefaultText() {
    this.submitButton.textContent = this.buttonText;
  }
}
