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
const LOTS = require("./data/action.json")
const Dice = require('./core/dice');
const Socket = require("ws");
const { PROPERTY_TYPES, ACTIONS } = require('./core/constants')

let PLAYERS = [];
let PLAYER_ORDER = [];
let CURRENT_TURN = 0; // CURRENT TURN NUMBER.
let PLAYER_NICKNAME;
let PLAYER_INDEX; // get it from the list that the server sends on game_start. this player's position in the order of play.
let GAME_PAUSED = false; // for when there are more than one steps to a turn; i.e rolling a dice & buying a house... to prevent people from making any actions inbetween.
let CLIENT;
let GAME;
let BANK;

function decodeOperation(op)  {
  const [nickname, operation] = op.split(" ");
  const { action, origin, payload } = JSON.parse(operation);

  // actions 
  switch (action) {
    case "dice-roll":
      processMove(payload, origin);
      console.log(`${player.getName()} played ${dice[0]+dice[1]} to land on ==> ${GAME.getPropertyAtPosition(player.getPosition())}`)
      console.log("is paused??", GAME_PAUSED)
      console.log()
      break;

    // ?? might remove
    case "next-turn":
      nextTurn();
      break;

    case "purchase":
      buyProperty(origin)
      console.log("is paused??", GAME_PAUSED)
      break

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
  PLAYERS = list.map(player => new Player({ name: player, token: "shoe" }));
  PLAYER_INDEX = PLAYER_ORDER.indexOf(PLAYER_NICKNAME);
  
  console.log("---------------------------------")
  console.log("game started!")
  console.log(`${PLAYERS.length} players`)
  console.log(`${PLAYER_ORDER.join(" ")}`)
  console.log(`your index is ${PLAYER_INDEX}`)
  console.log("---------------------------------")

  const bankOptions = {
    properties: PROPERTIES_STASH,
    cash: CASH_STASH,
    chance: "",
    community_chest: ""
  };
  BANK = new Bank(bankOptions);
  GAME = new Game({ lots: LOTS, bank: BANK, gameboard: GAME_BOARD, players: PLAYERS });

  // add the event handlers for all the actions
  // roll dice
  // buy property
  // buy building
  // mortgage
  // trade
}

function rollDice (curr_player) {
  const player = PLAYERS[curr_player];
  
  // this check should be done somewhere else.
  if (CURRENT_TURN === curr_player && !player.isInJail()) {
    const dice = Dice.roll();
    return broadcast(
      'dice-roll',
      curr_player,
      dice,
      () => processMove(dice, curr_player)
    )
  }
  return [null, null]

  // include error types... e.g player in jail.
}

function processMove(dice, player_index) {
  const player = PLAYERS[player_index];
  const [x,y] = dice;
  const moves = x+y;
  const position = player.move(moves);
  
  const propertyAtPosition = GAME.getPropertyAtPosition(position);
  const propertyOwner = propertyAtPosition.getOwner();
  const propertyType = propertyAtPosition.getType();
  
  console.log(`== ${player.getName()}'s new position <-> ${propertyType}!`)
  // GAME_PAUSED = true;
  
  // constants
  const {
    GO, GOTO_JAIL, TAX,
    UTILITY, STATION, PROPERTY,
    CHANCE, COMMUNITY_CHEST,
    FREE_PARKING,  JUST_VISITING
  } =  PROPERTY_TYPES;

  switch (propertyType) {
    case UTILITY:
      if (propertyOwner == null) {
        GAME_PAUSED = true;
        // display something to the user so that they can choose something.
      } else if (propertyOwner != null && propertyOwner != player) {
        player.payRent(propertyAtPosition, moves);
        nextTurn();
      }
      break;

    case STATION:
    case PROPERTY:
      if (propertyOwner == null) {
        GAME_PAUSED = true;
        // display something to the user so that they can choose something.
      } else if (propertyOwner != null && propertyOwner != player) {
        player.payRent(propertyAtPosition);
        nextTurn();
      }
      break;

    case TAX:

    case CHANCE:

    case COMMUNITY_CHEST:

    case GO:

    case GOTO_JAIL:

    case FREE_PARKING:

    case JUST_VISITING:
  
    default:
      break;
  }
  return [moves, player]
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
  const player = PLAYERS[curr_player];
  const position = player.getPosition();
  const property = GAME.getPropertyAtPosition(position);
  
  const purchaseWentThrough = player.purchase(property);
  GAME_PAUSED = false;
  if(purchaseWentThrough) nextTurn()
  return [purchaseWentThrough, player];
}

function mortgageProperty(curr_player, property) {
  const player = PLAYERS[curr_player];
  player.mortgage(property);
}

function unMortgageProperty(curr_player, property) {
  const player = PLAYERS[curr_player];
  player.unMortgage(property);
}

function nextTurn() {
  // check for gameover here.
  let temp = CURRENT_TURN+1;
  CURRENT_TURN = temp == PLAYERS.length ? 0 : temp;
  return CURRENT_TURN;
}

/* network related functions */
function broadcast(type, origin, payload, action) {
  CLIENT.send(generateMessage(type, origin, payload))
  return action();
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
PLAYER_NICKNAME = process.argv[2];
const dice = process.argv[3];

// someone will create a ws...
// and we'll connect to it
CLIENT = new Socket("ws://localhost:8108");

CLIENT.on("open", (ws) => {
  CLIENT.send(`nickname ${PLAYER_NICKNAME}`);
  console.log('connected to server')
  // setTimeout(() => {
  //   CLIENT.send(`init-dice-roll ${PLAYER_NICKNAME} ${dice}`)
  // }, 10000);
})

CLIENT.on("message", function(data) {
  // the data we'll be getting is in two forms...
  // the game ops;
  // and the dice roll thingy.
  let [operation, ...message] = data.split(" ");
  message = message.join(" ");
  // let operation = data.slice(0, data.indexOf(" "))
  
  switch (operation) {
    case "game-players":
      // play order
      PLAYER_ORDER = message.split("-");
      break;
      
    case "game-start":
      // start game
      PLAYER_ORDER = message.split("-");
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

process.stdin.on("data", function(data) {
  data = data.toString().trim();
  const [action, payload] = data.split(" ")

  if (PLAYER_INDEX != CURRENT_TURN && GAME_PAUSED) {
    console.log("-----------!!ERROR!!ERROR!!ERROR!!ERROR!!ERROR!!---------")
    console.log("xxxxxxxx sorry you cant perform any ops atm xxxxxxxx")
    console.log("xxxxxxxx wait till the curr player is done with turn xxxxx")
    console.log("---------------------------------------------------------")
    console.log();
    return;
  }
  // include game pause reason
  // and some gameaction object... that contains details ahout the current action.
  
  switch (action) {
    case "move":
      // logic to check validity of move.
      const [dice, player] = rollDice(PLAYER_INDEX);
      
      console.log(`${player.getName()} played ${dice} to land on ==> ${GAME.getPropertyAtPosition(player.getPosition())}`)
      console.log("is paused??", GAME_PAUSED)
      console.log()
      break;

    case "position":
      console.log(`${PLAYER_NICKNAME}'s position is ==> ${PLAYERS[PLAYER_INDEX].getPosition()}`)
      console.log()
      break;

    case "purchase":
      const [purchaseWentThrough, player] = broadcast(
        'purchase',
        PLAYER_INDEX,
        null,
        () => buyProperty(PLAYER_INDEX)
      )

      console.log(`== ${player.getName()} ${purchaseWentThrough ? 'bought' : 'couldnt buy'} property on ${player.getPosition()}`)
      console.log("== is paused??", GAME_PAUSED)
      console.log()
      break;
  
    case "init-roll":
      CLIENT.send(`init-dice-roll ${PLAYER_NICKNAME} ${dice}`)
      break;
      
    default:
      console.log("whyy")
      break;
  }
  // check for prompts...
})
