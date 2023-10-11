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
  confirmDeleteButton,
  avatarModalForm,
} from "../utils/const.js";
import PopupConfirmation from "../components/PopupConfirmation";

//
// API
//
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "799c4be9-a1c3-44a2-bda1-67abb1e7f630",
    "Content-Type": "application/json",
  },
});

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

const updateAvatarFormValidator = new FormValidator(
  validationSettings,
  avatarModalForm
);
updateAvatarFormValidator.enableValidation();

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
  addPicPopup.renderLoading(true);
  api
    .addCard(data)
    .then(() => {
      renderCard(data);
      addPicPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addPicPopup.renderLoading(false);
    });
}

function handleEditProfileFormSubmit(data) {
  // userInfo.setUserInfo(data);
  editProfilePopup.renderLoading(true);

  api
    .editUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

function handleAvatarFormSubmit(input) {
  updateAvatar.renderLoading(true);

  api
    .updateProfilePic(input)
    .then(() => {
      profileUpdateAvatarBtn.src = input.link;
      updateAvatar.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      updateAvatar.renderLoading(false);
    });
}

// function handleCardLike(cardID) {
//   api
//     .addLike(cardID)
//     .then((isLiked) => {
//       this.setLikeState(isLiked);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

function handleAttemptDelete() {
  confirmDelete.open();
}
//
// Update Avatar
//

const updateAvatar = new PopupWithForm(
  "#avatar-modal",
  handleAvatarFormSubmit,
  "Save"
);
updateAvatar.setEventListeners();

//
// Confirmation Modal
//

const confirmDelete = new PopupConfirmation("#confirm-modal");
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

const addPicPopup = new PopupWithForm(
  "#add-modal",
  handleAddFormSubmit,
  "Create"
);
addPicPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleEditProfileFormSubmit,
  "Save"
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
