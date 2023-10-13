import { confirmDeleteForm } from "../utils/const.js";

export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleAddLike,
    handleRemoveLike,
    handleAttemptDelete
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likedState = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleAttemptDelete = handleAttemptDelete;
    console.log(data);
  }

  _setEventListeners() {
    this._imageDeleteBtn.addEventListener("click", () => {
      console.log(this._cardElement, this._cardId);
      this._handleAttemptDelete(this._cardElement, this._cardId, this);
    });
    this._likeButton.addEventListener("click", () => {
      if (this._likedState) {
        this._handleRemoveLike(this, this._cardId);
      } else {
        this._handleAddLike(this, this._cardId);
      }
    });
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this._cardImageElement)
    );
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  setLikeState(isLiked) {
    this._likedState = isLiked;
    if (this._likedState) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setCardElements() {
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.alt = this._name;
    this._cardImageElement.src = this._link;
    this._cardTitleElement.textContent = this._name;
    this.setLikeState(this._likedState);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._imageDeleteBtn = this._cardElement.querySelector(".card__delete");

    this._setCardElements();
    this._setEventListeners();
    return this._cardElement;
  }
}
