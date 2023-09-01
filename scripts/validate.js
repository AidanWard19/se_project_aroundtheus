function showInputError(formElement, inputElement, options) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  const errorMessageRedLine = formElement.querySelector(
    `#${inputElement.id}-redline`
  );
  console.log(errorMessageRedLine);
  errorMessageRedLine.classList.add(options.inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  const errorMessageRedLine = formElement.querySelector(
    `#${inputElement.id}-redline`
  );
  errorMessageRedLine.classList.remove(options.inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(options.errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function setEventListeners(formElement, options) {
  const inputElements = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function toggleButtonState(inputElements, submitButton, options) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

// disable button function

// enable button function

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__text-underline-red",
  errorClass: "modal__error_visible",
};

enableValidation(config);

const hasInvalidInput = (inputElements) => {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Validate my forms
//
//Get list of all forms

//Go through the list of forms, for each form, find list of its respective inputs
const enableValidation = (options) => {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, options);
  });
  console.log(formElements);
};

//Go through list of inputs, add listeners for user input

//For input listeners, create functions to execute validity
//check input is valid
//if it is valid --> get rid of error because its valid
//if it isnt valid --> show appropriate error --> function to find appropriate error
//if it isnt valid, also disable the submit button
//
//
//
