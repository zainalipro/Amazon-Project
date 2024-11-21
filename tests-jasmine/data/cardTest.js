import { addToCard, card, loadFromStorage } from '../../data/cards.js';

describe('test suite: AddToCard', () => {
    // if the card is already in the card list, it should not be added again

    it('add an existing product into the card', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('card'));
        loadFromStorage();
        addToCard('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(card.length).toEqual(1);
    });
    // it('add a new item into the card', () => {
    //     expect(addToCard());
    // });
});