import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, deleteHandler) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._deleteHandler = deleteHandler;
  }

  getCardInfo(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId;
    console.log(this._cardElement);
    console.log(this._cardId);
  }

  deleteConfirmed(cardElement, cardId) {
    this._deleteHandler(cardElement, cardId);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.deleteConfirmed(this._cardElement, this._cardId);
    });
    super.setEventListeners();
  }
}
