// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// wildcard.js
// ---
// this is the wildcard object. it will contain every information about the wildcard
// namely:
// - the information on the card
// - type of card (CHANCE/COMMUNITY CHEST)
// - the text on the card,
// - the action on the card

class Wildcard {
  constructor() {

  }
}

// ---
// chance
// ---
class Chance extends Wildcard {
  constructor() {
    super();
  }
}


// ---
// community chest
// ---
class CommunityChest extends Wildcard {
  constructor(){
    super();
  }
}

module.exports = {
  Chance,
  CommunityChest
}
