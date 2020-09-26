// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// player.js
// ---
// this is the player object. it will contain every information about the player
// namely:
//    - the player name
//    - the token they chose
//    - their position on the board
//    - their current cards (properties, and wildcards),
//    - their current cash,
//    - if they're in jail
//    - number of turns to miss (while in jail).
//    - bankrupt (or when they leave the game);
// ---
// the player can also perform these following actions.
// (Detailed docs about each function will be located right before the function definition).
//    - move(steps) -> void                           [Moves the player's token by n steps].
//    - purchase(property) -> Boolean                 [Purchase a property either from the bank or from another player]
//    - payRent(property) -> Boolean                  [Pay rent to the owner of a property].
//    - develop(property) -> Boolean                  [Builds a house/hotel on a property].
//    - liftMortgage(property) -> Boolean             [Lifts the mortgage on a property].
//    - mortgage(property) -> Boolean                 [Mortgages a property]
//    - sell(property, buyer) -> Boolean              [Sells a property to a player].
//    - processMove(property) -> Boolean              [Determines what to do depending on the property(owner, type... e.t.c)]

//    - useWildCard() -> Boolean.
//    - getWildCards() -> <Wildcard>[]
//    - updateWildCards() -> Boolean
//    - getTotalCash() -> Integer
//    - updateCash(amount, action) -> Boolean.
//    - getProperties(type, color) -> <Property>[] (An array of Propertys) (NB: Property is a class).
//    - isInJail() -> Boolean.
//    - hasTurnToMiss() -> Boolean.
//    - getPosition() -> <Integer>[x,y]
//    - getToken() -> Token

module.exports = class Player {
  constructor(options) {
    const { name, token } = options;

    this._name = name;                      // player name.
    this._token = token;            // chosen character token.
    this._cash = [];                        // player's cash stash
    this._position = [0,0];                 // two-valued array - [x,y]
    this._properties = [];                  // player's property stash 
    this._inJail = false;                   // in jail or not...
    this._turnsToMiss = 0;                  // when player is in jail, how many turns to miss.
    this._wildcards = [];
  }

  move(steps) {}

  purchase(property){}
  payRent(property){}
  develop(property, amount){}
  mortgage(property){}
  liftMortgage(property){}
  sell(property, buyer){}
  processMove(property){}

  useWildcard(){}
  getWildcards(){}
  updateWildcards(){}
  getTotalCash(){}
  updateCash(amount, action){}
  getProperties(){}
  isInJail(){}
  hasTurnToMiss(){}
  getPosition(){}
  getToken(){}
}
