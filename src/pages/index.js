import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { validationConfig } from "../utils/constants.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5e8e020c-b61a-4dd5-8396-2a90d5fe115d",
    "Content-Type": "application/json",
  },
});

// profile modal elements
const editModal = document.querySelector("#edit-modal");
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.querySelector("#profile-name-input");
const descriptionInput = profileFormElement.querySelector(
  "#profile-description-input"
);

// profile elements
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileAvatarElement = document.querySelector(".profile__avatar");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

// avatar modal elements
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarFormElement = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// photo card elements
const cardTemplate = document.querySelector("#card-template").content;
const cardsListElement = document.querySelector(".cards__list");

// new post modal elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__add-btn");
const newPostFormElement = document.forms["new-post"];
const imageLinkInput = document.querySelector("#new-image-input");
const captionInput = document.querySelector("#post-caption-input");
const newPostSubmitBtn = newPostFormElement.querySelector(".modal__submit-btn");

// delete modal elements
const deleteModal = document.querySelector("#delete-modal");
const deleteFormElement = deleteModal.querySelector(".modal__form");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");

// image preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

// universal elements
const closeButtons = document.querySelectorAll(".modal__close-btn");
let selectedCard, selectedCardId;

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      renderCard(card, "append");
    });

    profileNameElement.textContent = user.name;
    profileDescriptionElement.textContent = user.about;
    profileAvatarElement.src = user.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKeyPressed);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKeyPressed);
}

function handleEscapeKeyPressed(evt) {
  if (evt.key === "Escape") {
    const modalEl = document.querySelector(".modal_opened");
    closeModal(modalEl);
  }
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({ name: nameInput.value, about: descriptionInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;

      closeModal(editModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmitForm(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarPicture({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatarElement.src = data.avatar;

      closeModal(avatarModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardLikeBtn.addEventListener("click", (evt) => handleLikeCard(evt, data._id));
  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImg.src = data.link;
    previewModalImg.alt = data.name;
    previewModalCaption.textContent = cardImageEl.alt;
  });

  return cardElement;
}

function handleLikeCard(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-btn_liked");

  api
    .changeLikeStatus(cardId, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch((err) => console.error(err));
}

function handleDeleteCard(cardElement, cardId) {
  openModal(deleteModal);
  selectedCard = cardElement;
  selectedCardId = cardId;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Deleting...", "Delete");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => console.log(err))
    .finally(() => setButtonText(submitBtn, false, "Deleting...", "Delete"));
}

function handleNewPostSubmitForm(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .addNewCard({ name: captionInput.value, link: imageLinkInput.value })
    .then((res) => {
      const data = res;
      renderCard(data);
      closeModal(newPostModal);
      newPostFormElement.reset();
      disableButton(newPostSubmitBtn, validationConfig);
    })
    .catch((err) => console.error(err))
    .finally(() => setButtonText(submitBtn, false));
}

function renderCard(card, method = "prepend") {
  const cardElement = getCardElement(card);
  cardsListElement[method](cardElement);
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(
    profileFormElement,
    [nameInput, descriptionInput],
    validationConfig
  );
  openModal(editModal);
});
profileFormElement.addEventListener("submit", handleProfileSubmitForm);

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});
avatarFormElement.addEventListener("submit", handleAvatarSubmitForm);

newPostButton.addEventListener("click", () => openModal(newPostModal));
newPostFormElement.addEventListener("submit", handleNewPostSubmitForm);

deleteFormElement.addEventListener("submit", handleDeleteSubmit);
deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
});

enableValidation(validationConfig);
