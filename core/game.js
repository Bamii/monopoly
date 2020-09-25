// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// game.js
// ---
// this is the game object. it will contain every information about the game and 
// namely:

// ---
// game map (11X11)
// ---
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 16 | 12 | 03 | 12 | 12 | 05 | 13 | 13 | 06 | 13 | 07 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 11 |    |    |    |    |    |    |    |    |    | 14 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 11 |    |    |    |    |    |    |    |    |    | 14 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 02 |    |    |    |    |    |    |    |    |    | 02 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 11 |    |    |    |    |    |    |    |    |    | 14 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 05 |    |    |    |    |    |    |    |    |    | 05 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 10 |    |    |    |    |    |    |    |    |    | 03 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 10 |    |    |    |    |    |    |    |    |    | 15 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 06 |    |    |    |    |    |    |    |    |    | 04 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 10 |    |    |    |    |    |    |    |    |    | 15 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// | 17 | 05 | 05 | 03 | 09 | 05 | 04 | 08 | 02 | 08 | 01 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// ---

class Game {
  constructor(options) {
    const { gameboard, bank, mapType = "plain" } = options;

    this._players = [];
    this._gameboard = gameboard;
    this._bank = bank;
    this._mapType = mapType; // could be "plain" or "classic" ???

    // setup the board when the game is initialised.
    this.setupBoard();
  }

  init() {

  }

  addPlayer(player) {
    return this._players.push(player);
  }

  getBank() {
    return this._bank;
  }

  setupBoard() {
    const bank = this._bank;
    const gameBoard = this._gameboard;
    const bankProperties = bank.getProperties();
    const land = bankProperties[0];

    // loop through the properties and set each of them
    // on the board.
    for(let property of bankProperties) {
      const [x,y] = property.getPosition();
      gameBoard[x][y] = property;
    }
  }

  getGameboard() {
    return this._gameboard;
  }

  disburseCash(players) {
    for (let player of players) {
      this._bank.disburseCash(player);
    }
  }
}

module.exports = Game;
