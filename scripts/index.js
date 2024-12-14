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
const editModalCloseButton = editModal.querySelector(".modal__close-btn");
const profileFormElement = document.querySelector("#edit-modal .modal__form");
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
const newPostModalCloseButton = document.querySelector(
  "#new-post-modal .modal__close-btn"
);
const newPostFormElement = document.querySelector(
  "#new-post-modal .modal__form"
);
const imageLinkInput = document.querySelector("#new-image-input");
const captionInput = document.querySelector("#post-caption-input");

// image preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

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

  const newCard = getCardElement(data);
  cardsListElement.prepend(newCard);

  closeModal(newPostModal);
}

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", function (e) {
  const targetModal = e.target.closest(".modal");
  closeModal(targetModal);
});

profileFormElement.addEventListener("submit", handleProfileSubmitForm);

newPostButton.addEventListener("click", () => {
  imageLinkInput.value = "";
  captionInput.value = "";
  openModal(newPostModal);
});

newPostModalCloseButton.addEventListener("click", (e) => {
  const targetModal = e.target.closest(".modal");
  closeModal(targetModal);
});

newPostFormElement.addEventListener("submit", handleNewPostSubmitForm);

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsListElement.append(cardElement);
});
