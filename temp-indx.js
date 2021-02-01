// ---
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// ---
const Player = require('./core/player');
const Bank = require('./core/bank');
const Game = require('./core/game');
const PROPERTIES_STASH = require('./data/properties.json');
const CASH_STASH = require('./data/cash.json');
const GAME_BOARD = require('./data/game_board');
const Dice = require('./core/dice');
const Socket = require("ws");


let PLAYERS = [];
let playerOrder = [];
let PLAYER_NICKNAME;
let current_player = 0;
let playerIndex = 4; // get it from the list that the server sends on game_start. this player's position in the order of play.
let GAME_PAUSED = false; // for when there are more than one steps to a turn; i.e rolling a dice & buying a house... to prevent people from making any actions inbetween.
let CLIENT;
let GAME;
let BANK;

// someone will create a ws...
// and we'll connect to it
const client = new Socket("ws://localhost:8108");
client.on("message", function(data) {
  // the data we'll be getting is in two forms...
  // the game ops;
  // and the dice roll thingy.
  let [operation, ...message] = data.split(" ");
  message = message.join(" ");
  
  switch (operation) {
    case "game-players":
      // play order
      playerOrder = message.split("-");
      PLAYERS = playerOrder;
      break;
      
    case "game-start":
      // start game
      startGame(message);
      break;
      
    case "game-op":
      // perform an operation
      decodeOperation(message);
      break;
  
    default:
      break;
  }
});

function decodeOperation(op)  {
  const [nickname, operation] = op.split(" ");
  const { action, origin, payload } = JSON.parse(operation);

  switch (action) {
    case "dice-roll":
      processMove(payload, origin);
      break;

    case "next-turn":
      nextTurn();
      break;

    case "purchase":

    case "income-tax":

    case "wildcard":
      decodeCard(payload, origin);
      break;
  
    default:
      break;
  }
}

function decodeCard(card, player) {
  /* 
    card format
    -> {
      type: 'chance' || 'community-chest',
      operation: {}
    }
  */
}

function startGame(list) {
  // a-b-c-d => list format for the ordered list of players (from server).
  list = list.split("-");
  PLAYERS =  list.map(player => new Player({ name: player, token: "shoe" }));
  const index = playerOrder.indexOf(nickname);
  
  console.log("---------------------------------")
  console.log("game started!")
  console.log(`${PLAYERS.length} players`)
  console.log(`${playerOrder.join(" ")}`)
  console.log(`your index is ${index}`)
  console.log("---------------------------------")

  const bankOptions = {
    properties: PROPERTIES_STASH,
    cash: CASH_STASH,
    chance: "",
    community_chest: ""
  };
  BANK = new Bank(bankOptions);
  GAME = new Game({ bank: BANK, gameboard: GAME_BOARD, players: PLAYERS });

  // add the event handlers for all the actions
  // roll dice
  // buy property
  // buy building
  // mortgage
  // trade
}

// old fn
function rollDice(curr_player) {
  const player = players[curr_player];
  
  if(!player.isInJail()) {
    const [dice, position] = player.rollDiceAndMove();
  
    const propertyAtPosition = GAME.getPropertyAtPosition(position);
    const propertyOwner = propertyAtPosition.getOwner();
    
    if (propertyOwner == null) {
      GAME_PAUSED = true;
      // display something to the user so that they can choose something.
    } else if (propertyOwner != null && propertyOwner != player) {
      player.payRent(propertyAtPosition);
    }
  } else {
    // visual prompt. or sth.
  }
}

function rollDice2 (curr_player) {
  const player = players[curr_player];

  const dice = Dice.roll();

  if (current_player === curr_player && !player.isInJail()) {
    broadcast(
      'dice-roll',
      curr_player,
      dice,
      () => processMove(dice, curr_player)
    )
  }
}

function processMove(dice, player) {
  player = players[player];
  const [x,y] = dice;
  const moves = x+y;
  const position = player.move(moves);

  const propertyAtPosition = GAME.getPropertyAtPosition(position);
  const propertyOwner = propertyAtPosition.getOwner();
  
  if (propertyOwner == null) {
    GAME_PAUSED = true;
    // display something to the user so that they can choose something.
  } else if (propertyOwner != null && propertyOwner != player) {
    player.payRent(propertyAtPosition);
  }
}

function drawCard(cardType, curr_player) {
  const drawnCard = BANK.drawCard(cardType);

  broadcast(
    'wildcard',
    curr_player,
    drawnCard,
    () => decodeCard(drawCard, curr_player)
  );
}

function buyProperty(curr_player) {
  const player = players[curr_player];
  const position = player.getPosition();
  const property = GAME.getPropertyAtPosition(position);
  
  const purchaseWentThrough = player.purchase(property, BANK);
  GAME_PAUSED = false;

  broadcast(
    'next-turn',
    curr_player,
    null,
    nextTurn
  )
}

function mortgageProperty(curr_player, property) {
  const player = players[curr_player];
  player.mortgage(property);
}

function unMortgageProperty(curr_player, property) {
  const player = players[curr_player];
  player.unMortgage(property);
}

function nextTurn() {
  // check for gameover here.
  let temp = current_player+1;
  current_player = temp == players.length ? 0 : temp;
  return current_player;
}

function broadcast(type, origin, payload, action) {
  CLIENT.send(generateMessage(type, origin, payload))
  action();
}

function generateMessage(action, origin, payload) {
  const msg_payload = { action, origin, payload }
  return `game-op ${PLAYER_NICKNAME} ${JSON.stringify(msg_payload)}`
}

 


// -----------------------------!
// -----------------------------|
// thingsss
// -----------------------------|
// -----------------------------!
const nickname = process.argv[2];
const dice = process.argv[3];

client.on("open", (ws) => {
  client.send(`nickname ${nickname}`);
  
  setTimeout(() => {
    client.send(`init-dice-roll ${nickname} ${dice}`)
  }, 5000);
})

process.stdin.on("data", function(data) {
  data = data.toString();
  const index = playerOrder.indexOf(nickname);

  switch (data) {
    case "move":
      rollDice2(index);
      break;

    case "position":

      break;
  
    default:
      break;
  }
})
