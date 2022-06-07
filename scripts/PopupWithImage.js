import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	_form = null;
	_popupErrors = null;

	constructor(popup, buttonOpen, options) {
		super(open, buttonOpen);

		const { form } = options;

		this._popupErrors = this._popup.querySelectorAll(".popup__error");
		this._form = form;
	}
}