const ws = require("ws");

class GS {
  constructor() {
    this._clients = new Map();
    this._server = new ws.Server({ port: 8108 })
    this._ACK_COUNTER = 0;

    this._server.on("listening", function() {
      console.log("Welcome to Mission Control!!")
      console.log()
    })

    this._server.on('connection', (ws) => {
      ws.on('message', (data) => {
        let [action, ...message] = data.split(" ");

        switch (action) {
          case "init-dice-roll":
            let [nickname, dice] = message;
            this._ACK_COUNTER++;
            const tempVal = this._clients.get(nickname);
            this._clients.set(nickname, { ...tempVal, dice })

            if (this._ACK_COUNTER == this._clients.size) {
              this.broadcast(`game-start ${this.getClients("nickname").join("-")}`)
            }
            break;

          case "nickname":
            let z = message.join(" ")
            this._clients.set(z, { dice: null, nickname: z, ws });
            this.broadcast(`game-players ${this.getClients("nickname").join("-")}`);
            break;

          case "game-op":
            let b =  message[0];
            this.broadcast(data, b)
            break;
        
          default:
            break;
        }
      });
    });
    // return address.
  }

  broadcast(message, from = null) {
    this._clients.forEach(({ ws }, nickname) => {
      if(nickname != from) {
        ws.send(message);
      }
    })
  }

  getClients(id) {
    return Array
      .from(this._clients.values())
      .sort((a, b) => b.dice - a.dice)
      .map(client => id ? client[id] : client);
  }
}

// function makeClientObject() {}

// messages format
/* 
  - nickname
    -> nickname bami

  - initial dice roll
    -> init-dice-roll nickname 4

  - game operations
    -> game-op nickname message.
*/

const gs = new GS();
