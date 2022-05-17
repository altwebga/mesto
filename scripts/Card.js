export default class Card {
  constructor(data, cardSelector, galleryList) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    
    const cardNode = this._generateCard(this._name, this._link, this._cardSelector);
    this._renderCard(cardNode, galleryList);
  }
  //Получение разметки из HTML и клонирование элемента
  _getTemplate(cardSelector) {
    return document
      .querySelector(cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  //Публичный метод для наполнения содержимым и возврата карточки
  _generateCard(name, link, cardSelector) {
    this._card = this._getTemplate(cardSelector);
    this._setEventListeners();
    this._card.querySelector(".card__title").textContent = name;
    this._cardImage = this._card.querySelector(".card__image");
    this._cardImage.alt = name;
    this._cardImage.src = link;

    return this._card;
  }

  _renderCard(cardNode, galleryList) {
    galleryList.prepend(cardNode);
  }

  //обработка лайка
  _toggleLike(evt) {
    evt.target.classList.toggle("like-active");
  }
  // удаление карточки
  _deleteCard(evt) {
    const card = evt.target.closest(".card");
    card.remove();
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
