import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }
}
