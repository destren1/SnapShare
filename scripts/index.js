const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const addCard = (cardData, deleteCallBack) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCallBack(cardElement);
  });

  return cardElement;
};

initialCards.forEach((item) => {
  const newCard = addCard(item, (cardElement) => {
    cardElement.remove();
  });
  placesList.append(newCard);
});
