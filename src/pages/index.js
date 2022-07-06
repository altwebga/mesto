import "./index.css";
import {
  validatorSettings,
  nameInput,
  descriptionInput,
} from "../utils/constants.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";

// отключаем transition при загрузке страницы
const initPreload = () => {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("preload");
  });
};

const popupDelete = new PopupWithConfirmation(".popup_delete", (id, card) => {
  api
    .deleteCard(id)
    .then((res) => {
      popupDelete.close();
      card.deleteCard();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupDelete.setDefaultText();
    });
});
popupDelete.setEventListeners();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "42e01300-6b25-4c03-8697-88df9fb36e11",
    "Content-Type": "application/json",
  },
});

const buttonOpenProfile = document.querySelector(".profile__edit"),
  buttonEditPhoto = document.querySelector(".profile__avatar-hover"),
  cardOpenButton = document.querySelector(".profile__button");

const formAddCards = document.querySelector(".popup__form_add_card"),
  formEditProfile = document.querySelector(".popup__form_edit_profile"),
  formChangePhoto = document.querySelector(".popup__form_change-photo");

const popupWithImage = new PopupWithImage(".popup_img");
popupWithImage.setEventListeners();

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    userId = info._id;
    userInfo.setUserInfo({
      name: info.name,
      descr: info.about,
      avatar: info.avatar,
    });
    initialCards.reverse();
    section.renderItems(initialCards);
  
  })
  .catch((err) => {
    console.log(err);
  });

function createNewCard(item) {
  const card = new Card(
    userId,
    item,
    ".card-template",
    () => {
      popupWithImage.open(item);
    },
    () => {
      popupDelete.open(card);
    },
    () => {
      api
        .likeCard(item._id)
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    () => {
      api
        .deleteLikeCard(item._id)
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    () => {
      popupDelete.formListener(card.deleteCard);
    }
  );

  return card.getCard();
}

const section = new Section(
  {
    renderer: (item) => {
      section.addItem(createNewCard(item));
    },
  },
  ".card"
);
initPreload();
const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__profession",
  avatar: ".profile__avatar",
});

const cardValidator = new FormValidator(validatorSettings, formAddCards);

cardValidator.enableValidation();

const popupCards = new PopupWithForm(".popup_edit_card", (event) => {
  event.preventDefault();

  api
    .postNewCard(popupCards.getInputValues())
    .then((res) => {
      section.addItem(createNewCard(res));
      popupCards.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCards.setDefaultText();
    });
});

popupCards.setEventListeners();

const popupProfile = new PopupWithForm(".popup_edit_profile", (event) => {
  event.preventDefault();

  const data = popupProfile.getInputValues();

  api
    .sendProfileInfo(data.name, data.descr)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, descr: res.about });
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.setDefaultText();
    });
});

popupProfile.setEventListeners();

const popupPhoto = new PopupWithForm(".popup_edit_photo", (event) => {
  event.preventDefault();

  const data = popupPhoto.getInputValues();

  api
    .sendProfilePhoto(data.link)
    .then((res) => {
      userInfo.setUserInfo({ avatar: res.avatar });
      popupPhoto.close();
    })
    .catch((err) => {
      console.log(err);
      popupPhoto.setErrorText();
    });
});

popupPhoto.setEventListeners();

const profileValidator = new FormValidator(validatorSettings, formEditProfile);

profileValidator.enableValidation();

buttonOpenProfile.addEventListener("click", () => {
  popupProfile.open();
  const data = userInfo.getUserInfo();

  nameInput.value = data.name;
  descriptionInput.value = data.description;

  profileValidator.resetValidation();
});

cardOpenButton.addEventListener("click", () => {
  cardValidator.resetValidation();

  popupCards.open();
});

const photoValidator = new FormValidator(validatorSettings, formChangePhoto);

photoValidator.enableValidation();

buttonEditPhoto.addEventListener("click", () => {
  photoValidator.resetValidation();

  popupPhoto.open();
});
