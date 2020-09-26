// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// deck.js
// ---
// this is the deck object. it will contain every information about the deck of cards
// namely:
//    - the cards in that deck.
// ---
// the deck should be able to perform these following operations
//    - shuffle the cards.

// NB: i intend for this class to be able to be used in card games too.

module.exports = class Deck {
  constructor(cards) {
    this._cards = [...cards];
  }

  shuffle() {
    return this._cards;
  }
}
