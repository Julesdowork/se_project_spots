const initialCards = [
  {
    name: "Forward Pass",
    link: "../images/1-the-new-york-public-library-fnDFfaGwIxI-unsplash.jpg",
  },
  {
    name: "Blue mountain folds",
    link: "../images/2-paul-pastourmatzis-mqO0Rf-PUMs-unsplash.jpg",
  },
  {
    name: "Moon over Kyoto",
    link: "../images/3-marek-piwnicki-SjNDJm5LSnY-unsplash.jpg",
  },
  {
    name: "Chicago Time",
    link: "../images/4-anton-melekh-QqntN8-hcKo-unsplash.jpg",
  },
  {
    name: "A group of rocks in the middle of a forest",
    link: "../images/5-edwin-chen-uFH7yP-hy44-unsplash.jpg",
  },
  {
    name: "Surrounded by pigeons",
    link: "../images/6-danny-greenberg-UD0SfgEq5WY-unsplash.jpg",
  },
];

const editModal = document.querySelector("#edit-modal");
const profileEditButton = document.querySelector(".profile__edit-btn");
const editModalCloseButton = editModal.querySelector(".modal__close-btn");

const profileFormElement = document.querySelector(".modal__form");
const nameInput = profileFormElement.querySelector("#profile-name-input");
const descriptionInput = profileFormElement.querySelector(
  "#profile-description-input"
);

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const cardTemplate = document.querySelector("#card-template").content;
const cardsListElement = document.querySelector(".cards__list");

function openModal() {
  editModal.classList.add("modal_opened");

  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  const profileName = nameInput.value;
  const profileDescription = descriptionInput.value;

  profileNameElement.textContent = profileName;
  profileDescriptionElement.textContent = profileDescription;

  closeModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", openModal);
editModalCloseButton.addEventListener("click", closeModal);
profileFormElement.addEventListener("submit", handleProfileSubmitForm);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);

  cardsListElement.append(cardElement);
}
