import Card from "./Card.js";
import FormHandler from "./FormHandler.js";
import PopupPhotoCard from "./PopupPhotoCard.js";

export default class FormHandlerAddCard extends FormHandler {
	_inputTitle = null;
	_inputLink = null;
	_galleryList = null;
	_instancePopupAddCard = null;
	_popupShowCard = null;

	constructor(formNode, options) {
		super(formNode);

		const {
			galleryList,
			instancePopupAddCard,
			popupShowCard
		} = options;

		this._instancePopupAddCard = instancePopupAddCard;
		this._galleryList = galleryList;
		this._popupShowCard = popupShowCard;
		this._inputTitle = this._formNode.querySelector('.popup__input-title');
		this._inputLink = this._formNode.querySelector('.popup__input-link');
	}

	_submitExtraFunc() {
		const name = this._inputTitle.value;
		const link = this._inputLink.value;

		this._prependCardNode(name, link);
		this._instancePopupAddCard.closePopup();
	}

	_prependCardNode(name, link) {
		const card = new Card({ name, link }, "#card-template");
		const cardNode = card.generateCard();
		const cardImageNode = cardNode.querySelector('.card__image');
		const instancePopupPhotoCard = new PopupPhotoCard(this._popupShowCard, cardImageNode, {
			cardNode
		});
		instancePopupPhotoCard.init();

		this._galleryList.prepend(cardNode);
	}
}
