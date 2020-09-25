//The output element
const output = document.querySelector("#output");
const input = document.querySelector("#input");
const button = document.querySelector("button");
button.addEventListener("click", clickHandler, false);

// | -- --- -- |
// | 0 | 1 | 2 |
// | -- --- -- |
// | 3 | 4 | 5 |
// | -- --- -- |
// | 6 | 7 | 8 |
// | -- --- -- |

const map = [
  { 
    location: "td studio",
    boundary :"It's too dangerous to move that way."
  },
  { 
    location: "language lab",
    boundary :"A mysterious force holds you back.",
  },
  { 
    location: "library",
    boundary :"A tangle of thorns blocks your way.",
  },
  { 
    location: "classroom",
    boundary :"You can't step over the dragon.",
  },
  { 
    location: "passage way",
    boundary :"",
  },
  { 
    location: "kitchen",
    boundary :"The gate locks shut.",
  },
  { 
    location: "bathroom",
    boundary :"The river is too deep to cross.",
  },
  { 
    location: "bedroom",
    boundary :"The trees are too thick to pass.",
  },
  { 
    location: "gameroom",
    boundary :"You're too scared to go that way.",
  }
];
const KNOWN_ACTIONS = ["north", "south", "east", "west"];
let mapLocation = 4;
let gameMessage = "";

render();

function clickHandler() {
  playGame();
}

function playGame() {
  playerInput = input.value.toLowerCase();

  gameMessage = "";
  action = "";

  for (const known_action of KNOWN_ACTIONS) {
    if (playerInput === known_action) {
      action = known_action;
      console.log(action);
      break;
    }
  }

  switch (action) {
    case "north":
      if (mapLocation <= 2) {
        gameMessage = map[mapLocation].boundary;
      } else {
        mapLocation -= 3;
      }
      break;

    case "south":
      if (mapLocation >= 6) {
        gameMessage = map[mapLocation].boundary;
      } else {
        mapLocation += 3;
      }
      break;

    case "west":
      if (mapLocation % 3 === 0) {
        gameMessage = map[mapLocation].boundary;
      } else {
        mapLocation -= 1;
      }
      break;

    case "east":
      if (mapLocation % 3 === 2) {
        gameMessage = map[mapLocation].boundary;
      } else {
        mapLocation += 1;
      }
      break;

    default:
      gameMessage = "I don't understand that";
      break;
  }
  render();
}

function render() {
  //Render the location
  output.innerHTML = map[mapLocation].location;
  //Display the game message
  output.innerHTML += "<br><em>" + gameMessage + "</em>";
}
