const Deck = require('./core/deck');
const cards = require('../data/chance.json');                         // array of cards that should be in the deck.
let deck;

beforeAll(() => {
  deck = new Deck(cards);
});

test('DECK TEST -->', () => {
  test('expect deck.shuffle to shuffle the cards', () => {
    // i'm not entirely sure how this can be properly tested.
    // but let's see...
  });

  test('expect deck.sort to sort the cards', () => {

  });
});
