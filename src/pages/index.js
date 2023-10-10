//
// CLASS IMPORTS (& css)
//

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

//
// CONST IMPORT
//
import {
  initialCards,
  profileEditBtn,
  profileModalName,
  profileModalTitle,
  addPicBtn,
  addPicModal,
  imageModalCloseBtn,
  validationSettings,
  profileModalForm,
  profileUpdateAvatarBtn,
} from "../utils/const.js";
import PopupConfirmation from "../components/PopupConfirmation";

//
// API
//
// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "d854fb88-5689-4d51-b447-dfc184cb771b",
//     "Content-Type": "application/json",
//   },
// });

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
  console.log(data);
  editProfilePopup.close();
}

function handleAvatarFormSubmit() {
  updateAvatar.close();
}

function handleConfirmDelete() {
  confirmDelete.close();
}

function handleAttemptDelete() {
  confirmDelete.open();
}
//
// Update Avatar
//

const updateAvatar = new PopupWithForm("#avatar-modal", handleAvatarFormSubmit);
updateAvatar.setEventListeners();

//
// Confirmation Modal
//

const confirmDelete = new PopupConfirmation(
  "#confirm-modal",
  handleConfirmDelete
);
confirmDelete.setEventListeners();

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

addPicBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addPicPopup.open();
});

imageModalCloseBtn.addEventListener("click", () => {
  imagePreview.close();
});

profileUpdateAvatarBtn.addEventListener("click", () => {
  updateAvatar.open();
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
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleAttemptDelete
  );
  cardSection.addItem(card.getView());
}

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".gallery__cards"
);

cardSection.renderItems();
