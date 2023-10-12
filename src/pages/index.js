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
  profileEditBtn,
  profileModalName,
  profileModalTitle,
  addPicBtn,
  addPicModal,
  validationSettings,
  profileModalForm,
  profileUpdateAvatarBtn,
  profilePicture,
  avatarModalForm,
} from "../utils/const.js";
import PopupConfirmation from "../components/PopupConfirmation";

// NEW CLASSES /////////////////////////////////////////////////////////////////////

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
// PopupWithForms
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

const updateAvatar = new PopupWithForm(
  "#avatar-modal",
  handleAvatarFormSubmit,
  "Save"
);
updateAvatar.setEventListeners();

//
// Confirmation Modal
//

const confirmDelete = new PopupConfirmation("#confirm-modal", deleteHandler);
confirmDelete.setEventListeners();

//
// PopupWithImage
//

const imagePreview = new PopupWithImage("#image-modal");
imagePreview.setEventListeners();

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

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__title",
  ".profile__picture"
);

// api
//   .getUserInfo()
//   .then((data) => {
//     console.log(data);
//     userInfo.setUserInfo(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//
// FUNCTIONS
//\
function renderCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleAddLike,
    handleRemoveLike,
    handleAttemptDelete
  );
  cardSection.addItem(card.getView());
}

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
    .then((data) => {
      renderCard(data);
    })
    .then(() => {
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
  editProfilePopup.renderLoading(true);

  api
    .editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => {
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

function handleAvatarFormSubmit(data) {
  updateAvatar.renderLoading(true);
  console.log(data);
  api
    .updateProfilePic(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => {
      updateAvatar.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      updateAvatar.renderLoading(false);
    });
}

function handleAddLike(card, cardID) {
  api
    .addLike(cardID)
    .then((data) => {
      console.log(data);
      card.setLikeState(data.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleRemoveLike(card, cardID) {
  api
    .removeLike(cardID)
    .then((data) => {
      console.log(data);
      card.setLikeState(data.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleAttemptDelete(cardElement, cardId) {
  console.log(cardId);
  confirmDelete.open();
  confirmDelete.getCardInfo(cardElement, cardId);
}

function deleteHandler(cardElement, cardId) {
  this.renderLoading(true);
  api
    .deleteCard(cardId)
    .then(() => {
      this.close();
    })
    .then(() => {
      cardElement.remove();
      cardElement = null;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      this.renderLoading(false);
    });
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

addPicBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addPicPopup.open();
});

profileUpdateAvatarBtn.addEventListener("click", () => {
  updateAvatarFormValidator.resetValidation();
  updateAvatar.open();
});

//
// Calls
//

let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    console.log(data);
    userInfo.setUserInfo(data);
    profilePicture.src = data.avatar;
    cardSection = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".gallery__cards"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });
