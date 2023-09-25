import { openModal, closeModal } from "../utils/utils.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    // this._openButton = document.querySelector(`${popupSelector}-open-button`);
  }

  open() {
    openModal(this._popupElement);
  }

  close() {
    closeModal(this._popupElement);
  }

  // _handleEscClose(event) {
  //   // I dont think I need this function since the open and close modals add and remove document event listener for esc key.
  //   // if (event.key === "Escape") {
  //   //   const openedModal = document.querySelector(".modal_opened");
  //   //   this.close();
  //   }

  // }

  setEventListeners() {
    // this._openButton.addEventListener("click", open());
    this._closeButton.addEventListener("click", close());
  }
}
