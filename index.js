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
const MAX_PLAYERS = 8;



function playGame() {
  // ---
  // game variables
  // ---
  // get the players somehow.
  // players

  const thisPlayer = new Player({ name: 'ad', dice: 3 })
  const players = [];
  players[0] = new Player({ name: 'bami', token: 'shoe' });
  players[1] = new Player({ name: 'deji', token: 'horse' });
  
  // bank, dice, game init.
  const bankOptions = {
    properties: PROPERTIES_STASH,
    cash: CASH_STASH,
    chance: "",
    community_chest: ""
  };
  const newBank = new Bank(bankOptions);
  const newGame = new Game({ bank: newBank, gameboard: GAME_BOARD, players });
  
  // proposed API
  /* 
    -- class methods.
    Game.addPlayer();
    Game.addPlayers();
    Game.disburseCash();
  */
 /* 
    *NEW* i think i'd rather just do all these in the game object?
 */
  // const disburse_cash = newGame.disburseCash(players);


  const [ nuplayers, turnNumber ] = newGame.init();
  let current_player = 0;

  while(!newGame.isGameOver()) {
    // get player input...
    // determine if user can perform the input.
    // act on the input
    // e.g: let's say the user bids something.
    //
    // 2. then rolls the dice.
    // every player can do these

    // only the current playe can do this
    if (newGame.isCurrentPlayer(thisPlayer)) {
      // do some activities.
      // send something over the network
      // say for example, i want to roll the dice.
      // the rolldice internally calls currentplayer.rollDice().
      newGame.rollDice();

      // 1. ask for input
      // 2. input has to be one of
      //    - rolldice
      //    - 


      
    }
  }
}

// function render() {}
// playGame();

const myP = new Player({ name: 'a', token: 'h', dice: 5 });

console.log(myP.move(12));
console.log(myP.move(12));
console.log(myP.move(12));
console.log(myP.move(12));
console.log(myP.move(12));
