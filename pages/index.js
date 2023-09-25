//
// IMPORTS
//

// import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
// import UserInfo from "../components/UserInfo.js";
import { openModal, closeModal } from "../utils/utils.js";

//
// CONSTS
//
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
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const profileModalName = document.querySelector(".modal__name");
const profileModalTitle = document.querySelector(".modal__title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const addPicModal = document.querySelector("#add-modal");
const addPicBtn = document.querySelector(".profile__add-button");
const addPicModalCloseBtn = addPicModal.querySelector(".modal__close");
const imageModal = document.querySelector("#image-modal");
const imageModalCloseBtn = imageModal.querySelector(".modal__close");
const cardGallery = document.querySelector(".gallery__cards");
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__text-underline-red",
  errorClass: "modal__error_visible",
};
const profileModalForm = profileEditModal.querySelector(".modal__form");

//
// FORM VALIDATION
//

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

function handleImageClick() {
  const popUpImage = imageModal.querySelector(".modal__image-preview");
  const popUpCaption = imageModal.querySelector(".modal__image-caption");
  // I think these two consts can be global
  // test out to make sure
  popUpImage.src = this._cardImageElement.src;
  popUpImage.alt = this._cardImageElement.alt;
  popUpCaption.textContent = this._cardTitleElement.textContent;
  openModal(imageModal);
}

function handleAddFormSubmit(data) {
  renderCard(data);
  addPicPopup.close();
}

//
// EVENT LISTENERS
//

profileModalForm.addEventListener("submit", handleEditProfileFormSubmit);

profileEditBtn.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalTitle.value = profileTitle.textContent;
  editFormValidator.checkResetValidation();
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

addPicModalForm.addEventListener("submit", handleAddFormSubmit);

imageModalCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

//
// Popup
//

//
// PopupWithForm
//

const addPicPopup = new PopupWithForm("#add-modal", handleAddFormSubmit);
addPicPopup.setEventListeners();

// const editProfilePopup = new PopupWithForm("#edit-modal", handleEditFormSubmit);
// editProfilePopup.setEventListeners();

//
// PopupWithImage
//

const imagePreview = new PopupWithImage("#image-modal");
imagePreview.setEventListeners();

//
// Section
//

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  cardSection.addItem(card.getView());
}

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  cardGallery
);

cardSection.renderItems();
