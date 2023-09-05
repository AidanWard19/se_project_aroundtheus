export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;

    this._inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    this._errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    this._errorMessageRedLine = this._formElement.querySelector(
      `#${inputElement.id}-redline`
    );
    this._errorMessageRedLine.classList.add(this._inputErrorClass);
    this._errorMessageElement.textContent = inputElement.validationMessage;
    this._errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    this._errorMessageRedLine = this._formElement.querySelector(
      `#${inputElement.id}-redline`
    );
    this._errorMessageRedLine.classList.remove(this._inputErrorClass);
    this._errorMessageElement.textContent = "";
    this._errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputElements) {
    return inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputElements, submitButton) {
    if (this._hasInvalidInput(inputElements)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputElements, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

// for index.js
