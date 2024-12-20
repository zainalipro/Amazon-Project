// object representation
/* 
const card = {
    cardItems: undefined,
    localStorageKey: undefined,
    loadFromStorage() {
        this.cardItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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
    },
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
    },

    removeFromCard(productId) {
        const newCard = [];
        this.cardItems.forEach((cardItem) => {
            if (cardItem.productId !== productId) {
                newCard.push(cardItem);
            }
        });
        this.cardItems = newCard;
        this.saveToStorage();
    },

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cardItems));
    },
    calculateCartQuantity() {
        let cardQuantity = 0;
        this.cardItems.forEach((cardItem) => {
            cardQuantity += cardItem.quantity;
        });
        return cardQuantity;
    },
    updateQuantity(newQuantity, productId) {
        this.cardItems.forEach((cardItem) => {
            if (cardItem.productId === productId) {
                cardItem.quantity = newQuantity;
            }
        });
        this.saveToStorage();
    },
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
    },

    removeCardItems() {
        localStorage.removeItem(this.localStorageKey);
    }
};
card.localStorageKey = 'card-oop';
card.loadFromStorage();
console.log(card);
console.log(card.calculateCartQuantity());
*/

// Procedure Representation(functional programming)
function Card(storageKey) {
    return {
        cardItems: undefined,
        localStorageKey: storageKey,
        loadFromStorage() {
            this.cardItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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
        },
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
        },

        removeFromCard(productId) {
            const newCard = [];
            this.cardItems.forEach((cardItem) => {
                if (cardItem.productId !== productId) {
                    newCard.push(cardItem);
                }
            });
            this.cardItems = newCard;
            this.saveToStorage();
        },

        saveToStorage() {
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.cardItems));
        },
        calculateCartQuantity() {
            let cardQuantity = 0;
            this.cardItems.forEach((cardItem) => {
                cardQuantity += cardItem.quantity;
            });
            return cardQuantity;
        },
        updateQuantity(newQuantity, productId) {
            this.cardItems.forEach((cardItem) => {
                if (cardItem.productId === productId) {
                    cardItem.quantity = newQuantity;
                }
            });
            this.saveToStorage();
        },
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
        },

        removeCardItems() {
            localStorage.removeItem(this.localStorageKey);
        }
    };
}
// For stander Amazon card
const card = Card('card-oop');
card.loadFromStorage();
console.log(card);
console.log(card.calculateCartQuantity());


// For amazon business card
const businessCart = Card('card-business');
businessCart.loadFromStorage();
// businessCart.addToCard('5968897c-4d27-4872-89f6-5bcb052746d7');
console.log(businessCart);
console.log(businessCart.calculateCartQuantity());


