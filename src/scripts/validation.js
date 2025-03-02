const showInputError = (formEl, inputEl, errorMsg, config) => {
  inputEl.classList.add(config.inputErrorClass);
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.classList.add(config.errorClass);
  errorMsgEl.textContent = errorMsg;
}

const hideInputError = (formEl, inputEl, config) => {
  inputEl.classList.remove(config.inputErrorClass);
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(config.errorClass);
}

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid)
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  else
    hideInputError(formEl, inputEl, config);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  }
  else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
}

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
}

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => hideInputError(formEl, input, config));
}

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function() {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
}

export { enableValidation, resetValidation, disableButton };