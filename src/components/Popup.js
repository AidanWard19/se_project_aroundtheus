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
    // this._openButton.addEventListener("click", this.open());
    this._closeButton.addEventListener("click", this.close());
  }
}
