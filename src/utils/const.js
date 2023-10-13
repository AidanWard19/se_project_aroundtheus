export const initialCards = [
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
export const profileEditBtn = document.querySelector(".profile__edit-button");
export const profileEditModal = document.querySelector("#edit-modal");
export const profileModalCloseBtn =
  profileEditModal.querySelector(".modal__close");
export const profileModalName = document.querySelector(".modal__name");
export const profileModalTitle = document.querySelector(".modal__title");
export const profileName = document.querySelector(".profile__name");
export const profileTitle = document.querySelector(".profile__title");
export const addPicModal = document.querySelector("#add-modal");
export const addPicBtn = document.querySelector(".profile__add-button");
export const addPicModalCloseBtn = addPicModal.querySelector(".modal__close");
export const imageModal = document.querySelector("#image-modal");
export const imageModalCloseBtn = imageModal.querySelector(".modal__close");
export const cardGallery = document.querySelector(".gallery__cards");
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__text-underline-red",
  errorClass: "modal__error_visible",
};
export const profileModalForm = profileEditModal.querySelector(".modal__form");
export const profileUpdateAvatarBtn = document.querySelector(
  ".profile__picture-overlay"
);
export const profilePicture = document.querySelector(".profile__picture");
export const avatarModal = document.querySelector("#avatar-modal");
export const avatarModalForm = avatarModal.querySelector(".modal__form");
export const confirmModal = document.querySelector("#confirm-modal");
export const confirmDeleteButton = confirmModal.querySelector(".modal__button");
export const confirmDeleteForm = confirmModal.querySelector(".modal__form");
