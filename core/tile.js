// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// tile.js
// ---

class Tile {
  constructor(options) {
    const { type, position } = options;
    this._type = type;
    this._position = position;
  }

  getPosition() {
    return this._position;
  }

  getType() {
    return this._type;
  }
}


module.exports = Tile;