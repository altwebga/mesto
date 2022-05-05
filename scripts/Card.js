export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  //Получение разметки из HTML и клонирование элемента
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  //Публичный метод для наполнения содержимым и возврата карточки
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.querySelector(".card__title").textContent = this._name;
    this._cardImage = this._card.querySelector(".card__image");
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._card;
  }
  //обработка лайка
  _toggleLike(evt) {
    evt.target.classList.toggle("like-active");
  }
  // удаление карточки
  _deleteCard(evt) {
    const card = evt.target.closest(".card");
    this.card.remove();
  }
  //открытие фото
  _openShowPhotoPopup = (evt) => {
    popupCaption.textContent = this.name;
    popupImage.src = this._link;
    popupImage.alt = this.name;
    openPopup(popupShow);
  };
  // Слушатели Card
  _setEventListeners() {
    this._card.querySelector(".card__button-like").addEventListener("click", (evt) => {
      this._toggleLike(evt);
    });
    this._card
      .querySelector(".card__button-trash")
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
    this._card.querySelector(".card__image").addEventListener("click", () => {
      this._openShowPhotoPopup();
    });
  }
}
