class Card {
    cardItems;
    // property with the #(hash) is called the private property
    #localStorageKey;

    constructor(storageKey) {
        this.#localStorageKey = storageKey;
        this.#loadFromStorage();

    }
    // we also have private method the with the # symbol is called the private method
    #loadFromStorage() {
        this.cardItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }
    // add to card function
    addToCard(productId) {
        let matchingItem;
        // checking  if the product is already in the cart.
        this.cardItems.forEach((cardItem) => {
            if (productId === cardItem.productId) {
                matchingItem = cardItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity++;
        } else {
            this.cardItems.push({
                productId,
                quantity: 1,
                deliveryOptionId: 1
            });
        }
        this.saveToStorage();
    }

    removeFromCard(productId) {
        const newCard = [];
        this.cardItems.forEach((cardItem) => {
            if (cardItem.productId !== productId) {
                newCard.push(cardItem);
            }
        });
        this.cardItems = newCard;
        this.saveToStorage();
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cardItems));
    }
    calculateCartQuantity() {
        let cardQuantity = 0;
        this.cardItems.forEach((cardItem) => {
            cardQuantity += cardItem.quantity;
        });
        return cardQuantity;
    }
    updateQuantity(newQuantity, productId) {
        this.cardItems.forEach((cardItem) => {
            if (cardItem.productId === productId) {
                cardItem.quantity = newQuantity;
            }
        });
        this.saveToStorage();
    }
    updateDeliveryOption(productId, deliveryOptionId) {
        // let matchingItem;
        // checking  if the product is already in the cart.
        this.cardItems.forEach((cardItem) => {
            if (productId === cardItem.productId) {
                cardItem.deliveryOptionId = deliveryOptionId;
            }
        });
        // matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

    removeCardItems() {
        localStorage.removeItem(this.#localStorageKey);
    }
}

const card = new Card('card');
export { card };

/*
export function loadCard(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        console.log(xhr.response);
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}
*/
export function loadCard(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.response);
            if (fun) {
                fun(xhr.response); // Call the provided function with the response if it exists
            }
        } else {
            console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
        }
    });

    xhr.addEventListener('error', () => {
        console.error('Request failed.');
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}