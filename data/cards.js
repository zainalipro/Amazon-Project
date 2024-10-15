export let card = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
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
            quantity: 1
        });
    }
    updateCardQuantity();
}

function updateCardQuantity() {
    let cardQuantity = 0;
    card.forEach((cardItem) => {
        cardQuantity += cardItem.quantity;
    });
    document.querySelector('.js-card-quantity')
        .textContent = cardQuantity;
}

export function removeFromCard(productId) {
    const newCard = [];
    card.forEach((cardItem) => {
        if (cardItem.productId !== productId) {
            newCard.push(cardItem);
        }
    });
    card = newCard;
}