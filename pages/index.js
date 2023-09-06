import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//
// CONSTS
//

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const profileModalName = document.querySelector(".modal__name");
const profileModalTitle = document.querySelector(".modal__title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const addPicModal = document.querySelector("#add-modal");
const addPicSubmitButton = addPicModal.querySelector(".modal__button");
const addPicBtn = document.querySelector(".profile__add-button");
const addPicModalCloseBtn = addPicModal.querySelector(".modal__close");
const addPicModalName = addPicModal.querySelector(".modal__image-name");
const addPicModalLink = addPicModal.querySelector(".modal__image-link");
const imageModal = document.querySelector("#image-modal");
const imageModalCloseBtn = imageModal.querySelector(".modal__close");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// const cardTemplate = "#card-template";
const cardListElement = document.querySelector(".gallery__cards");
const modals = Array.from(document.querySelectorAll(".modal"));

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__text-underline-red",
  errorClass: "modal__error_visible",
};

const profileModalForm = profileEditModal.querySelector(".modal__form");
const editFormValidator = new FormValidator(
  validationSettings,
  profileModalForm
);
editFormValidator.enableValidation();

const addPicModalForm = addPicModal.querySelector(".modal__form");
const addFormValidator = new FormValidator(validationSettings, addPicModalForm);
addFormValidator.enableValidation();

//
// FUNCTIONS
//

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileModalName.value;
  profileTitle.textContent = profileModalTitle.value;
  closeModal(profileEditModal);
}

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
//   document.addEventListener("keydown", closeModalOnEscape);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
//   document.removeEventListener("keydown", closeModalOnEscape);
// }

// function closeModalOnRemoteClick(event) {
//   if (event.target === event.currentTarget) {
//     closeModal(event.target);
//   }
// }

// function closeModalOnEscape(event) {
//   if (event.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closeModal(openedModal);
//   }
// }

// function getCardElement(data) {
//   // const cardElement = cardTemplate.cloneNode(true);
//   // const cardImageElement = cardElement.querySelector(".card__image");
//   // const cardTitleElement = cardElement.querySelector(".card__title");
//   // const imageDeleteBtn = cardElement.querySelector(".card__delete");
//   // const likeButton = cardElement.querySelector(".card__like-button");
//   // cardTitleElement.textContent = data.name;
//   // cardImageElement.alt = data.name;
//   // cardImageElement.src = data.link;

//   // cardImageElement.addEventListener("click", () => {
//   //   const popUpImage = imageModal.querySelector(".modal__image-preview");
//   //   const popUpCaption = imageModal.querySelector(".modal__image-caption");
//   //   popUpImage.src = cardImageElement.src;
//   //   popUpImage.alt = cardImageElement.alt;
//   //   popUpCaption.textContent = cardTitleElement.textContent;
//   //   openModal(imageModal);
//   // });
//   // imageDeleteBtn.addEventListener("click", () => cardElement.remove());
//   // likeButton.addEventListener("click", () =>
//   //   likeButton.classList.toggle("card__like-button_active")
//   // );
//   // Return Card
//   return cardElement;
// }

function handleImageClick() {
  this._popUpImage = imageModal.querySelector(".modal__image-preview");
  this._popUpCaption = imageModal.querySelector(".modal__image-caption");
  this._popUpImage.src = this._cardImageElement.src;
  this._popUpImage.alt = this._cardImageElement.alt;
  this._popUpCaption.textContent = this._cardTitleElement.textContent;
  openModal(imageModal);
}

function handleAddPicture(event) {
  event.preventDefault();
  const name = addPicModalName.value;
  const link = addPicModalLink.value;
  renderCard({ name, link });
  event.target.reset();
  addPicSubmitButton.classList.add("modal__button_disabled");
  // turn off submit button

  closeModal(addPicModal);
}

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  cardListElement.prepend(card.getView());
}

//
// EVENT LISTENERS
//

profileModalForm.addEventListener("submit", handleEditProfileFormSubmit);

profileEditBtn.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalTitle.value = profileTitle.textContent;
  editFormValidator.enableValidation();
  openModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

addPicBtn.addEventListener("click", () => {
  openModal(addPicModal);
});

addPicModalCloseBtn.addEventListener("click", () => {
  closeModal(addPicModal);
});

addPicModalForm.addEventListener("submit", handleAddPicture);

imageModalCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

//
// FUNCTION CALLS
//

initialCards.forEach(renderCard);
