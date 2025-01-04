const initialCards = [
  {
    name: "Forward Pass",
    link: "./images/1-the-new-york-public-library-fnDFfaGwIxI-unsplash.jpg",
  },
  {
    name: "Blue mountain folds",
    link: "./images/2-paul-pastourmatzis-mqO0Rf-PUMs-unsplash.jpg",
  },
  {
    name: "Moon over Kyoto",
    link: "./images/3-marek-piwnicki-SjNDJm5LSnY-unsplash.jpg",
  },
  {
    name: "Chicago Time",
    link: "./images/4-anton-melekh-QqntN8-hcKo-unsplash.jpg",
  },
  {
    name: "A group of rocks in the middle of a forest",
    link: "./images/5-edwin-chen-uFH7yP-hy44-unsplash.jpg",
  },
  {
    name: "Surrounded by pigeons",
    link: "./images/6-danny-greenberg-UD0SfgEq5WY-unsplash.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "./images/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

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

// photo card elements
const cardTemplate = document.querySelector("#card-template").content;
const cardsListElement = document.querySelector(".cards__list");

// new post elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__add-btn");
const newPostFormElement = document.forms["new-post"];
const imageLinkInput = document.querySelector("#new-image-input");
const captionInput = document.querySelector("#post-caption-input");
const newPostSubmitBtn = newPostFormElement.querySelector(".modal__submit-btn");

// image preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

// universal elements
const closeButtons = document.querySelectorAll(".modal__close-btn");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  const profileName = nameInput.value;
  const profileDescription = descriptionInput.value;

  profileNameElement.textContent = profileName;
  profileDescriptionElement.textContent = profileDescription;

  closeModal(editModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImg.src = data.link;
    previewModalImg.alt = data.name;
    previewModalCaption.textContent = cardImageEl.alt;
  });

  return cardElement;
}

function handleNewPostSubmitForm(evt) {
  evt.preventDefault();

  const data = {};
  data.link = imageLinkInput.value;
  data.name = captionInput.value;

  renderCard(data);

  closeModal(newPostModal);
  newPostFormElement.reset();
  disableButton(newPostSubmitBtn, settings);
}

function renderCard(card, method = "prepend") {
  const cardElement = getCardElement(card);
  cardsListElement[method](cardElement);
}

closeButtons.forEach(button => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(profileFormElement, [nameInput, descriptionInput], settings);
  openModal(editModal);
});

profileFormElement.addEventListener("submit", handleProfileSubmitForm);

newPostButton.addEventListener("click", () => openModal(newPostModal));

newPostFormElement.addEventListener("submit", handleNewPostSubmitForm);

initialCards.forEach((item) => {
  renderCard(item, "append");
});
