import { openModal, closeModal } from "../utils/utils.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    // this._openButton = this._popupElement.querySelector();
  }

  open() {
    openModal(this._popupElement);
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popupElement.addEventListener("mousedown", (evt) =>
      this._closeOnRemoteClick(evt)
    );
  }

  close() {
    closeModal(this._popupElement);
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popupElement.removeEventListener("mousedown", (evt) =>
      this._closeOnRemoteClick(evt)
    );
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _closeOnRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    // this._openButton.addEventListener("click", this.open());
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    // I didnt have this as an arrow function and it wasn't working.......... ^^^
  }
}
