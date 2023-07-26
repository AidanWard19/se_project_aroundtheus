let initialCards = [
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
//    Profile
//

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const profileModalCloseBtn = document.querySelector(".modal__close");

profileEditBtn.addEventListener("click", () => {
  profileEditModal.classList.toggle("modal_opened");
});

profileModalCloseBtn.addEventListener("click", () => {
  profileEditModal.classList.toggle("modal_opened");
});

const profileModalName = document.querySelector(".modal__name");
const profileModalTitle = document.querySelector(".modal__title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const profileModalForm = document.querySelector(".modal__form");

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileModalName.value;
  profileTitle.textContent = profileModalTitle.value;
  profileModalName.placeholder = `${profileModalName.value}`;
  profileModalTitle.placeholder = `${profileModalTitle.value}`;
  profileModalName.value = "";
  profileModalTitle.value = "";
  profileEditModal.classList.toggle("modal_opened");
}

profileModalForm.addEventListener("submit", handleFormSubmit);

//
//  Gallery
//

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
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.append(cardElement);
});
