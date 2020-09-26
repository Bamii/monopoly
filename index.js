// ---
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// ---
const Player = require('./core/player');
const Bank = require('./core/bank');
const Game = require('./core/game');
const Dice = require('./core/dice');

const PROPERTIES_STASH = require('./data/properties.json');
const CASH_STASH = require('./data/cash.json');
const GAME_BOARD = require('./data/game_board');
const { getType } = require('./core/utils');
const bankOptions = { properties: PROPERTIES_STASH, cash: CASH_STASH, chance: "", community_chest: "" };
const MAX_PLAYERS = 8;

// window.onload = function() {
//   playGame();
// };

function playGame() {
  // ---
  // game variables
  // ---
  // players
  const players = [];
  players[0] = new Player({ name: 'bami', token: 'shoe' });
  players[1] = new Player({ name: 'deji', token: 'horse' });
  
  // bank, dice, game init.
  const newBank = new Bank(bankOptions);  
  const newGame = new Game({ bank: newBank, gameboard: GAME_BOARD });
  const dice = new Dice();
  
  const disburse_cash = newGame.disburseCash(players);

  console.log(dice.roll());
}

function render() {}

playGame();
