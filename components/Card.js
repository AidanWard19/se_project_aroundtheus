export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const imageDeleteBtn = this._cardElement.querySelector(".card__delete");
    imageDeleteBtn.addEventListener("click", () => cardElement.remove());
    likeButton.addEventListener("click", () =>
      likeButton.classList.toggle("card__like-button_active")
    );
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._setEventListeners();
  }
}
