export default class FormHandler {
	_formNode = null;

	constructor(formNode) {
		this._formNode = formNode;
	}

	init() {
		this._setEventListeners();
	}

	_submitHandler = (event) => {
		event.preventDefault();
		this._submitExtraFunc();
	}

	_submitExtraFunc() {

	}

	_setEventListeners() {
		this._formNode.addEventListener('submit', this._submitHandler);
	}
}
