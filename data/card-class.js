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
        this.cardItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
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
};

const card = new Card('card-oop');
const businessCart = new Card('card-business');
console.log(card);
console.log(businessCart);
