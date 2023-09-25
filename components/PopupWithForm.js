import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    console.log(this._popupForm);
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    this._inputs = this._popupElement.querySelectorAll(".modal__input");
    this._inputsObject = {};
    this._inputs.forEach(
      (input) => (this._inputsObject[input.name] = input.value)
    );
    return this._inputsObject;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
    //?
  }
}
