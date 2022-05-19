import FormHandler from "./FormHandler.js";

export default class FormHandlerEditProfile extends FormHandler {
	_inputName = null;
	_inputProfession = null;
	_profileName = null;
	_profileProfession = null;
	_instancePopupEditProfile = null;

	constructor(formNode, options) {
		super(formNode);

		const {
			profileName,
			profileProfession,
			instancePopupEditProfile
		} = options;

		this._inputName = this._formNode.querySelector('.popup__input-name');
		this._inputProfession = this._formNode.querySelector('.popup__input-profession');
		this._profileName = profileName;
		this._profileProfession = profileProfession;
		this._instancePopupEditProfile = instancePopupEditProfile;

	}

	_submitExtraFunc() {
		this._editProfile();
		this._instancePopupEditProfile.closePopup();
	}

	_editProfile() {
		this._profileName.textContent = this._inputName.value;
		this._profileProfession.textContent = this._inputProfession.value;
	}

}
