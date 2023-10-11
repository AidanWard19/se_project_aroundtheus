import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, initialButtonText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    console.log(this._popupForm);
    this._handleFormSubmit = handleFormSubmit;
    console.log(this._closeButton);
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._initialButtonText = initialButtonText;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      if (this._initialButtonText === "Save") {
        this._submitButton.textContent = "Saving...";
      } else if (this._initialButtonText === "Create") {
        this._submitButton.textContent = "Creating...";
      }
    } else {
      this._submitButton.textContent = this._initialButtonText;
    }
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    console.log(inputs);
    const inputValues = {};
    inputs.forEach((input) => (inputValues[input.name] = input.value));
    console.log(inputValues);
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
    //?
  }
}
