export class Card {
  constructor(
    userId,
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    handleDeleteLikeCard
  ) {
    this._src = data.link;
    this._alt = data.name;
    this.id = data._id;
    this.likes = data.likes;
    this.likesNumber = this.likes.length;
    this.cardOwnerId = data.owner._id;
    this.userId = userId;
    this._templateSelector = templateSelector;

    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeCard = handleLikeCard;
    this.handleDeleteLikeCard = handleDeleteLikeCard;
    this.deleteCard = this.deleteCard.bind(this);
  }

  _updateLikesView() {
    this.likeCounter.textContent = this.likes.length;
    if (this._isLiked()) {
      this._addLike();
    } else {
      this._deleteLike();
    }
  }

  setLikes(likes) {
    this.likes = likes;
    this._updateLikesView();
  }

  _deleteLike() {
    this.buttonLike.classList.remove("card__like_active");
  }

  _addLike() {
    this.buttonLike.classList.add("card__like_active");
  }

  _setLike() {
    if (this.buttonLike.classList.contains("card__like_active")) {
      this.handleDeleteLikeCard();
    } else {
      this.handleLikeCard();
    }
  }

  _isLiked() {
    return this.likes.some((like) => like._id === this.userId);
  }

  _addInitialLike() {
    if (this._isLiked()) {
      this._addLike();
    }
  }

  _showDeleteButton() {
    if (this.cardOwnerId === this.userId) {
      this.buttonDelete.classList.remove("card__delete_hidden");
    }
  }

  _setEventListeners() {
    this.buttonLike.addEventListener("click", () => {
      this._setLike();
    });

    this.buttonDelete.addEventListener("click", () => {
      this.handleDeleteCard();
    });

    this.cardImage.addEventListener("click", () => {
      this.handleCardClick();
    });
  }

  _createCard() {
    this.cardTemplate = document.querySelector(this._templateSelector).content;

    this.cardElement = this.cardTemplate
      .querySelector(".card__place")
      .cloneNode(true);

    this.cardElement.setAttribute(["data-id"], this.id);
    this.buttonLike = this.cardElement.querySelector(".card__like");
    this.likeCounter = this.cardElement.querySelector(".card__like-counter");
    this.buttonDelete = this.cardElement.querySelector(".card__delete");
    this.cardImage = this.cardElement.querySelector(".card__img");
    this.cardLike = this.cardElement.querySelector(".card__like-counter");
    this.buttonLike.setAttribute(["data-id"], this.id);
    this.likeCounter.textContent = this.likesNumber;

    this.cardImage.alt = this._alt;
    this.cardImage.src = this._src;
    this.cardElement.querySelector(".card__name").textContent = this._alt;
    this._showDeleteButton();
    this._addInitialLike();
  }

  deleteCard() {
    this.cardElement.remove();
  }

  getCard() {
    this._createCard();

    this._setEventListeners();
    return this.cardElement;
  }
}
