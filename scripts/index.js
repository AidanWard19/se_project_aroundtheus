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
//    Profile Modal
//

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const profileModalName = document.querySelector(".modal__name");
const profileModalTitle = document.querySelector(".modal__title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileModalForm = profileEditModal.querySelector(".modal__form");

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileModalName.value;
  profileTitle.textContent = profileModalTitle.value;
  profileModalName.value = "";
  profileModalTitle.value = "";
  profileEditModal.classList.toggle("modal_opened");
}

profileModalForm.addEventListener("submit", handleFormSubmit);

profileEditBtn.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalTitle.value = profileTitle.textContent;
  toggleModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  toggleModal(profileEditModal);
});

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}
//
//  Add Modal
//

const addPicModal = document.querySelector("#add-modal");
const addPicBtn = document.querySelector(".profile__add-button");
const addPicModalCloseBtn = addPicModal.querySelector(".modal__close");
const addPicModalForm = addPicModal.querySelector(".modal__form");
const addPicModalName = addPicModal.querySelector(".modal__image-name");
const addPicModalLink = addPicModal.querySelector(".modal__image-link");

addPicBtn.addEventListener("click", () => {
  toggleModal(addPicModal);
});

addPicModalCloseBtn.addEventListener("click", () => {
  toggleModal(addPicModal);
});

addPicModalForm.addEventListener("submit", handleAddPicture);

function handleAddPicture(event) {
  event.preventDefault();
  const name = addPicModalName.value;
  const link = addPicModalLink.value;
  renderCard({ name, link });
  toggleModal(addPicModal);
}

//
//  Gallery
//

const imageModal = document.querySelector("#image-modal");
const imageModalBtns = document.querySelectorAll(".card__image");
const imageModalCloseBtn = imageModal.querySelector(".modal__close");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListElement = document.querySelector(".gallery__cards");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = data.name;
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;
  cardImageElement.addEventListener("click", () => {
    const popUpImage = imageModal.querySelector(".modal__image-preview");
    popUpImage.src = cardImageElement.src;
    toggleModal(imageModal);
  });

  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData));

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(getCardElement(cardData));
}

//
// Card Like Button
//

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
});

//
// Gallery Modal
//

/*
imageModalBtns.forEach((imageModalBtn) => {
  imageModalBtn.addEventListener("click", () => toggleModal(imageModal));
});
*/

imageModalCloseBtn.addEventListener("click", () => {
  toggleModal(imageModal);
});
