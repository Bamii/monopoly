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
// | 17 | 09 | 03 | 09 | 09 | 05 | 04 | 08 | 02 | 08 | 01 |
// | --   --   --   --   --   --   --   --   --   --   -- |
// ---
const Dice = require('./dice');
const Tile = require("./tile");
const { is } = require('./utils');

class Game {
  constructor(options) {
    const { lots, players, gameboard, bank, mapType = "plain" } = options;

    this._players = players;
    this._gameboard = gameboard;
    this._bank = bank;
    this._mapType = mapType; // could be "plain" or "classic" ???
    this._dice = new Dice();
    this._players = players;
    this._currentPlayer = 0;

    this.init(lots);
  }

  init(lots) {
    // setup the board when the game is initialised.
    this.setupBoard(lots);
    this.disburseCash();

    return [
      this._players,
      0
    ]
  }

  getBank() {
    return this._bank;
  }

  setupBoard(lots) {
    const gameBoard = this._gameboard;
    const bankProperties = this._bank.getProperties();

    // loop through the properties and set each of them
    // on the board.
    for(let property of bankProperties) {
      const [x,y] = property.getPosition();
      gameBoard[x][y] = property;
    }

    for(let lot of lots) {
      if (is("array", lot.position[0])) {
        for (let position of lot.position) {
          const [x, y] = position;
          this._gameboard[x][y] = new Tile(lot);
        }
      } else {
        const [x,y] = lot.position;
        this._gameboard[x][y] = new Tile(lot);
      }
    }
  }

  getPropertyAtPosition(position) {
    const [x,y] = position;
    return this._gameboard[x][y];
  }

  getGameboard() {
    return this._gameboard;
  }

  disburseCash() {
    for (let player of this._players) {
      this._bank.disburseCash(player);
    }
  }

  isGameOver() {}
}

module.exports = Game;
