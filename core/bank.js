// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// bank.js
// ---
// this is the bank object. it will contain every information about the bank
// namely:
//    - cash currently in the bank.
//    - properties currently in the bank's possession.
//    - mortgaged properties.
// ---
// the bank can perform these following actions
//    - disburseCash(players)
//    - payPlayer()
//    - mortgage()
//    - unMortgage()
//    - updateCash()
//    - getTotalCash()
//    - getProperties()

const Property = require('./property');
const Cash = require('./cash');

module.exports = class Bank {
  constructor(options) {
    const { properties, cash } = options;
    this._cash = [];
    this._properties = [];
    this._wildcards = [];
    this._mortgages = [];

    this.init(properties, cash);
  }

  init(properties, cash) {
    // setup cash.
    Object.entries(cash).forEach(([note, frequency]) => {
      for(let x = 0; x < frequency; x++) {
        this._cash.push(new Cash(note));
      }
    });

    // setup properties.
    Array.from(properties).forEach(property => {
      this._properties.push(new Property(property));
    });

    // setup wildcards.
  }

  mortgage(property) {
    return this._mortgages.push(property);
  }

  unMortgage() {

  }

  getProperties() {
    return this._properties;
  }

  disburseCash(player, ruleset) {
    
  }

  getTotalCash() {

  }

  updateCash() {

  }

  payPlayer() {

  }
}
