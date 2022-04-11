const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAddCard = profile.querySelector(".profile__button-add");
const gallery = document.querySelector(".gallery__list");
const cardTemplate = document.querySelector("#card-template").content;
const popupEdit = document.querySelector("#popup-edit-profile");
const formPopupEdit = popupEdit.querySelector(".popup__form");
const inputName = popupEdit.querySelector("#name");
const inputprofession = popupEdit.querySelector("#profession");
const popupAdd = document.querySelector("#popup-add-photo");
const formPopupAdd = popupAdd.querySelector(".popup__form");
const inputTitle = popupAdd.querySelector("#title");
const inputLink = popupAdd.querySelector("#link");
const popupShow = document.querySelector("#popup-show-photo");
const popupImage = popupShow.querySelector(".popup__image");
const popupCaption = popupShow.querySelector(".popup__caption");

const createCardElement = ({ name, link }) => {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  const image = newCard.querySelector(".card__image");
  image.alt = name;
  image.src = link;
  image.addEventListener("click", openShowPhotoPopup);

  const title = newCard.querySelector(".card__title");
  title.textContent = name;

  const like = newCard.querySelector(".card__button-like");
  like.addEventListener("click", toggleLike);

  const trash = newCard.querySelector(".card__button-trash");
  trash.addEventListener("click", deleteCard);

  return newCard;
};

const createCards = (cards) =>
  cards.reverse().forEach((card) => gallery.append(createCardElement(card)));

const addCard = () => {
  const newCardData = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  gallery.prepend(createCardElement(newCardData));
};

const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

const toggleLike = (evt) => {
  const like = evt.target;
  const card = like.closest(".card");
  const cardStatus = card.dataset.setlike;

  if (cardStatus === "false") {
    card.dataset.setlike = "true";
    like.classList.add("like-active");
  }
  if (cardStatus === "true") {
    card.dataset.setlike = "false";
    like.classList.remove("like-active");
  }
};

const editProfileData = () => {
  const name = inputName.value;
  const profession = inputprofession.value;

  if (name !== profileName.textContent) {
    profileName.textContent = name;
  }
  if (profession !== profileProfession.textContent) {
    profileProfession.textContent = profession;
  }
};

const processProfileEditForm = (evt) => {
  evt.preventDefault();
  editProfileData();
  closePopup(popupEdit);
};

const sendingFormChanges = (evt) => {
  evt.preventDefault();
  addCard();
  inputTitle.value = "";
  inputLink.value = "";
  closePopup(popupAdd);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscBtn);
};

const closePopupEscBtn = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(closePopup);
  };
};



const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputprofession.value = profileProfession.textContent;
  openPopup(popupEdit);
};

const openAddPhotoPopup = () => openPopup(popupAdd);

const openShowPhotoPopup = (evt) => {
  popupCaption.textContent = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openPopup(popupShow);
};

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddPhotoPopup);
popupImage.addEventListener("click", openShowPhotoPopup);

formPopupEdit.addEventListener("submit", processProfileEditForm);
formPopupAdd.addEventListener("submit", sendingFormChanges);

createCards(initialCards);
