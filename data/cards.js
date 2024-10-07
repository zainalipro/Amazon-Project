export const card = [];

// add to card function
export function addToCard(productId) {
    let matchingItem;
    // checking  if the product is already in the cart or not.
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
}