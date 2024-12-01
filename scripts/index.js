const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
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
const profileJobElement = document.querySelector(".profile__description");

// console.log(nameInput.value);
// console.log(descriptionInput.value);
// console.log(profileNameElement.textContent);
// console.log(profileJobElement.textContent);

function openModal() {
  editModal.classList.add("modal_opened");

  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileJobElement.textContent;
}

profileEditButton.addEventListener("click", openModal);

editModalCloseButton.addEventListener("click", function () {
  editModal.classList.remove("modal_opened");
});
