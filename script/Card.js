export class Card {
    constructor(title, link) {
        this._title = title;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const newCard = cardTemplate.querySelector(".card").cloneNode(true);
        return newCard;
    }
    generateCard() {
        const newCard = cardTemplate.querySelector(".card").cloneNode(true);

        const image = newCard.querySelector(".card__image");
        image.alt = title;
        image.src = link;
        image.addEventListener("click", openShowPhotoPopup);
      
        const title = newCard.querySelector(".card__title");
        title.textContent = title;
      
        const like = newCard.querySelector(".card__button-like");
        like.addEventListener("click", toggleLike);
      
        const trash = newCard.querySelector(".card__button-trash");
        trash.addEventListener("click", deleteCard);
      
        return newCard;
    }
}
items.forEach((item) => {
    const card = new Card(item.title, item.link,);
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    document.querySelector('.card').append(cardElement);
  });