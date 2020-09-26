// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// cash.js
// ---
// this is the cash object. it will contain every information about the cash
// namely:
//    - string value of the cash... maybe "title"??
//    - numeric value of the cash... for use in calculations.
// ---
// no actions can/will be performed with the cash.

module.exports = class Cash {
  constructor(value) {
    this.value = Number.parseInt(value);
    this.text = value.toString();
  }
};
