// ---
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// ---
const Player = require('./core/player');
const Bank = require('./core/bank');

const PROPERTIES_STASH = require('./data/properties.json');
const CASH_STASH = require('./data/cash.json');
const GAME_BOARD = require('./data/game_board');
const bankOptions = { properties: PROPERTIES_STASH, cash: CASH_STASH, chance: "", community_chest: "" };
const MAX_PLAYERS = 8;

window.onload = function() {
  playGame();
};

function playGame() {
  // game variables
  const players = [];
  const player = new Player({ name: 'bami', token: 'shoe' });
  players[0] = player;

  const newBank = new Bank(bankOptions);  
  const newGame = new Game({ bank: newBank, gameboard: GAME_BOARD });
  
  const disburse_cash = newGame.disburseCash(players);

  if (!disburse_cash) {

  }
  

  console.log(newGame.getGameboard());
}

function render() {
  //
}

playGame();
