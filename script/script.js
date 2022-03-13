const openProfile = document.querySelector('.profile__button-edit');
const closeProfile = document.querySelector('.popup__button-close');
const popupProfile = document.querySelector('#popup-edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#profession');

function togglePopup() {
    popupProfile.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

popupProfile.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openProfile.addEventListener('click', togglePopup);
closeProfile.addEventListener('click', togglePopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup()
}

formElement.addEventListener('submit', formSubmitHandler);