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
const Dice = require('./dice')
const { convToMonopolyMoney, convToFlat } = require('./utils');

module.exports = class Player {
  constructor(options) {
    const { name, token } = options;

    this._name = name;                      // player name.
    this._token = token;                    // chosen character token.
    this._cash = [];                        // player's cash stash
    this._position = [0,0];                 // two-valued array - [x,y]
    this._properties = [];                  // player's property stash 
    this._inJail = false;                   // in jail or not...
    this._turnsToMiss = 0;                  // when player is in jail, how many turns to miss.
    this._wildcards = [];
  }

  move(steps) {
    // logic to move the player's position;
    const [x, y] =  this._position;
    let rem; // remainder

    if (x == 10) {
      rem = y + steps;
      if (rem > 10) {
        this._position = [10-(rem-10), 10];
      } else {
        this._position = [10, rem]
      }
    }

    if (y == 10) {
      rem = x - steps;
      if (rem < 0) {
        this._position = [0, 10+rem]
      } else {
        this._position = [rem, 10]
      }
    }

    if (x == 0) {
      rem = y - steps;
      if (rem < 0) {
        this._position = [0-rem, 0]
      } else {
        this._position = [0, rem]
      }
    }

    if (y == 0) {
      rem = x + steps;
      if (rem > 10) {
        this._position = [10, rem-10]
      } else {
        this._position = [rem, 0]
      }
    }

    return this._position;
  }

  rollDiceAndMove() {
    const [a, b] = Dice.roll();
    const total = a+b;

    return [
      [a,b],
      this.move(total)
    ];
  }

  purchase(property){
    const price = property.getPrice();
    const owner = property.getOwner();
    const didRemit = this.remitCash(price);
    if (!didRemit) {
      return false;
    }

    owner.receiveCash(price);
    property.changeOwner(this);
    this.addProperty(property);
    owner.removeProperty(property);

    // returns boolean to determine if it succeeds.
  }

  remitCash(amount) {
    const monopoly_money_equivalent = convToMonopolyMoney(amount);
    const playercash = Object
      .entries(this._cash)
      .filter(([denomination, count]) => count != 0)
      .sort((a,b) => b[0] - a[0]);
    // Array.from(playercash.entries).filter(ca)
    // remove some amount of cash
  }

  receiveCash(amount) {
    // add some cash to their thingy
  }

  mortgage(property){

  }

  unMortgage(property){

  }

  isInJail(){
    return this._inJail;
  }

  getName(){
    return this._name;
  }

  drawCard(type, bank){
    const drawnCard = bank.drawCard(type);

    this.decodeCard(drawnCard);
  }

  decodeCard(card) {

  }

  payRent(property, utilityDiceRoll){
    const propertyOwner = property.getOwner();
    const numberOfOwnedPropertiesInColor = 
      propertyOwner
        .getProperties()
        .filter(myProperty => myProperty.getLocationCode() == property.getLocationCode())
        .length;

    const lotSize = utilityDiceRoll ? utilityDiceRoll : numberOfOwnedPropertiesInColor;

    const rent = property.calculateRent(lotSize);

    // validate and return likewise.
    this.remitCash(rent);
    propertyOwner.receiveCash(rent);
  }

  develop(property, amount){}
  sell(property, buyer){}
  processMove(property){}

  useWildcard(){}
  getWildcards(){}
  updateWildcards(){}
  getTotalCash(){}
  updateCash(amount, action){}
  getProperties(){}
  hasTurnToMiss(){}
  getToken(){}

  getPosition(){
    return this._position;
  }

  getProperties() {
    return this._properties;
  }

  removeProperty() {

  }

  addProperty() {

  }
}
