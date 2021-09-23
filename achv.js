
// old fn... ARCHIVE!!
function oldrollDice(curr_player) {
  const player = PLAYERS[curr_player];
  
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