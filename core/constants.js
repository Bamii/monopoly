const PROPERTY_TYPES = {
  STATION: 'station',
  UTILITY: 'utility',
  PROPERTY: "property",
  CHANCE: "chance",
  COMMUNITY_CHEST: "community-chest",
  GO: 'go',
  GOTO_JAIL: 'goto-jail',
  FREE_PARKING: 'free-parking',
  JUST_VISITING: 'just-visiting',
  TAX: 'tax'
}

const ACTIONS = {
  DICE_ROLL: 'dice-roll',
  NEXT_TURN: 'next-turn',
  PURCHASE: 'purchase',
  INCOME_TAX: 'income-tax',
  WILDCARD: 'wildcard'
}

module.exports = {
  ACTIONS,
  PROPERTY_TYPES
}