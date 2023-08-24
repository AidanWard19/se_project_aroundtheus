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
const profileModalForm = profileEditModal.querySelector(".modal__form");
const addPicModal = document.querySelector("#add-modal");
const addPicBtn = document.querySelector(".profile__add-button");
const addPicModalCloseBtn = addPicModal.querySelector(".modal__close");
const addPicModalForm = addPicModal.querySelector(".modal__form");
const addPicModalName = addPicModal.querySelector(".modal__image-name");
const addPicModalLink = addPicModal.querySelector(".modal__image-link");
const imageModal = document.querySelector("#image-modal");
const imageModalCloseBtn = imageModal.querySelector(".modal__close");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListElement = document.querySelector(".gallery__cards");

function setModalClickAwayListener(modal) {
  modal.addEventListener("click", () => {
    modal.classList.remove("modal_opened");
  });
}
const modals = Array.from(document.querySelectorAll(".modal"));
modals.forEach((modal) => setModalClickAwayListener(modal));

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileModalName.value;
  profileTitle.textContent = profileModalTitle.value;
  toggleModal(profileEditModal);
}

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const imageDeleteBtn = cardElement.querySelector(".card__delete");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardTitleElement.textContent = data.name;
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;
  // Event Listeners
  cardImageElement.addEventListener("click", () => {
    const popUpImage = imageModal.querySelector(".modal__image-preview");
    const popUpCaption = imageModal.querySelector(".modal__image-caption");
    popUpImage.src = cardImageElement.src;
    popUpImage.alt = cardImageElement.alt;
    popUpCaption.textContent = cardTitleElement.textContent;
    toggleModal(imageModal);
  });
  imageDeleteBtn.addEventListener("click", () => cardElement.remove());
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
  // Return Card
  return cardElement;
}

function handleAddPicture(event) {
  event.preventDefault();
  const name = addPicModalName.value;
  const link = addPicModalLink.value;
  renderCard({ name, link });
  event.target.reset();
  toggleModal(addPicModal);
}

initialCards.forEach(renderCard);

function renderCard(cardData) {
  cardListElement.prepend(getCardElement(cardData));
}

profileModalForm.addEventListener("submit", handleEditProfileFormSubmit);

profileEditBtn.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalTitle.value = profileTitle.textContent;
  toggleModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  toggleModal(profileEditModal);
});

addPicBtn.addEventListener("click", () => {
  toggleModal(addPicModal);
});

addPicModalCloseBtn.addEventListener("click", () => {
  toggleModal(addPicModal);
});

function closeAllModals() {
  profileEditModal.classList.remove("modal_opened");
  addPicModal.classList.remove("modal_opened");
  imageModal.classList.remove("modal_opened");
}

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "Escape") {
    closeAllModals();
  }
});

addPicModalForm.addEventListener("submit", handleAddPicture);

imageModalCloseBtn.addEventListener("click", () => {
  toggleModal(imageModal);
});
