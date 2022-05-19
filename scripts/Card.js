export default class Card {
	_name = null;
	_link = null;
	_cardSelector = null;
	_card = null;
	_cardTitle = null;
	_cardImage = null;
	_cardButtonLike = null;
	_cardButtonTrash = null;

	constructor(data, cardSelector) {
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
	}
	//Получение разметки из HTML и клонирование элемента
	_getTemplate(cardSelector) {
		return document
			.querySelector(cardSelector)
			.content.querySelector(".card")
			.cloneNode(true);
	}
	//Публичный метод для наполнения содержимым и возврата карточки
	generateCard() {
		this._card = this._getTemplate(this._cardSelector);

		this._cardTitle = this._card.querySelector(".card__title");
		this._cardImage = this._card.querySelector(".card__image");
		this._cardButtonLike = this._card.querySelector(".card__button-like");
		this._cardButtonTrash = this._card.querySelector(".card__button-trash");

		this._cardTitle.textContent = this._name;
		this._cardImage.alt = this._name;
		this._cardImage.src = this._link;

		this._setEventListeners();

		return this._card;
	}

	//обработка лайка
	_toggleLike() {
		this._cardButtonLike.classList.toggle("like-active");
	}
	// удаление карточки
	_deleteCard() {
		this._card.remove();
		this._card = null;
	}

	_setEventListeners() {
		this._cardButtonLike.addEventListener("click", (evt) => {
			this._toggleLike();
		});

		this._cardButtonTrash.addEventListener("click", (evt) => {
			this._deleteCard();
		});

		this._cardImage.addEventListener("click", (evt) => {
			//this._openShowPhotoPopup();
		});
	}
}
