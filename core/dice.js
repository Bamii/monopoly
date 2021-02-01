// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// dice.js
// ---
// this is the player object. it will contain every information about the dice
// namely:
// - a function that returne the values of the two dice.

module.exports = class Dice {
  static roll() {
    return [
      this.generateRandomNumber(),
      this.generateRandomNumber()
    ]
  }

  static generateRandomNumber(min = 1, max = 6) {
    return Math.ceil(Math.random() * (max - min) + min);
  }
}
