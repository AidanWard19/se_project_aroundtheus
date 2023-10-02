//
// CLASS IMPORTS (& css)
//

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
// import { openModal, closeModal } from "../utils/utils.js";

//
// CONST IMPORT
//
import {
  initialCards,
  profileEditBtn,
  profileEditModal,
  profileModalCloseBtn,
  profileModalName,
  profileModalTitle,
  profileName,
  profileTitle,
  addPicBtn,
  addPicModal,
  addPicModalCloseBtn,
  imageModal,
  imageModalCloseBtn,
  cardGallery,
  validationSettings,
  profileModalForm,
} from "../utils/const.js";

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
// User Info
//

const userInfo = new UserInfo(".profile__name", ".profile__title");

//
// FUNCTIONS
//

function handleImageClick(card) {
  const data = {
    link: card.src,
    name: card.alt,
  };
  imagePreview.open(data);
}

function handleAddFormSubmit(data) {
  renderCard(data);
  addPicPopup.close();
}

function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  // profileName.textContent = profileModalName.value;
  // profileTitle.textContent = profileModalTitle.value;
  console.log(data);
  editProfilePopup.close();
}

//
// EVENT LISTENERS
//

profileEditBtn.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileModalName.value = data.name;
  profileModalTitle.value = data.about;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

// profileModalCloseBtn.addEventListener("click", () => {
//   editProfilePopup.close();
// });

addPicBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addPicPopup.open();
});

// addPicModalCloseBtn.addEventListener("click", () => {
//   addPicPopup.close();
// });

// addPicModalForm.addEventListener("submit", handleAddFormSubmit);

imageModalCloseBtn.addEventListener("click", () => {
  imagePreview.close();
});

//
// PopupWithForm
//

const addPicPopup = new PopupWithForm("#add-modal", handleAddFormSubmit);
addPicPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleEditProfileFormSubmit
);
editProfilePopup.setEventListeners();

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
  ".gallery__cards"
);

cardSection.renderItems();
