export let card = JSON.parse(localStorage.getItem('card')) || [];

// add to card function
export function addToCard(productId) {
    let matchingItem;
    // checking  if the product is already in the cart.
    card.forEach((cardItem) => {
        if (productId === cardItem.productId) {
            matchingItem = cardItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        card.push({
            productId,
            quantity: 1
        });
    }
    saveToStorage();
}

export function removeFromCard(productId) {
    const newCard = [];
    card.forEach((cardItem) => {
        if (cardItem.productId !== productId) {
            newCard.push(cardItem);
        }
    });
    card = newCard;
    saveToStorage();
}

export function saveToStorage() {
    localStorage.setItem('card', JSON.stringify(card));
}
export function calculateCartQuantity() {
    let cardQuantity = 0;
    card.forEach((cardItem) => {
        cardQuantity += cardItem.quantity;
    });
    return cardQuantity;
}