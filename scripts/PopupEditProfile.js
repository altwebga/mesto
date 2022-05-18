import Popup from "./Popup.js";

export default class PopupEditProfile extends Popup {
	_inputName = null;
	_inputProfession = null;
	_profileName = null;
	_profileProfession = null;

	constructor(popup, buttonOpen, options) {

		super(popup, buttonOpen);

		const { inputName, inputProfession, profileName, profileProfession } = options;

		this._inputName = inputName;
		this._inputProfession = inputProfession;
		this._profileName = profileName;
		this._profileProfession = profileProfession;

	}

	_openPopupExtraFunc() {
		this._editFormInputs();
		this._disableButtonSave();
	}

	_editFormInputs() {
		this._inputName.value = this._profileName.textContent;
		this._inputProfession.value = this._profileProfession.textContent;
	}

}
