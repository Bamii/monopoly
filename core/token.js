// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// token.js
// ---
// this is the token object. it will contain every information about the token
// namely:
//    - token name
//    - image (optional).
//    - token_id

module.exports = class Token {
  constructor(token) {
    this._tokenName  = token;
    this._tokenId = 0;
  }
}
