export let card = JSON.parse(localStorage.getItem('card')) || [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: 1
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: 2
    }


];

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
            quantity: 1,
            deliveryOptionId: 1
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
export function updateQuantity(newQuantity, productId) {
    card.forEach((cardItem) => {
        if (cardItem.productId === productId) {
            cardItem.quantity = newQuantity;
        }
    });
    saveToStorage();

}