// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// property.js
// ---
// this is the property object. it will contain every information about the property
// namely:
//    - the owner of the property
//    - the price and title of the property
//    - the details of building on it. (houses and hotels).
//    - type of property; utility, station, property.
//    - location_code; see below.
//       (this is used for mapping the property to it's position on the board)
//       - GO -> 1
//       - COMMUNITY_CHEST -> 2
//       - CHANCE -> 3
//       - TAXES -> 4
//       - STATIONS -> 5
//       - UTILITIES -> 6
//       - GOTO_JAIL -> 7
//       - BROWN -> 8
//       - BLUE -> 9
//       - VIOLET -> 10
//       - ORANGE -> 11
//       - RED -> 12
//       - YELLOW -> 13
//       - GREEN -> 14
//       - DEEP_BLUE -> 15
//       - FREE_PARKING -> 16 
//       - JUST_VISITING -> 17
//       - NOTHING_AT_ALL -> 00
//    - for sale
//    - mortgaged status the property.
//    - developments (houses or hotels)... null by default;...
//      it increases and decreases with the number of houses the player buys. (min:1, max: 4)
//      and when it reaches it's max, it changes to ['hotel', 1] (min: 1, max: 1).
//      and it stop increasing from then on... only to decrease.
// ---
// the property can perform these following actions
//    - toggle mortgage.
//    - toggle sale.
//    - calculate rent.
//    - buildDevelopment.
//    - demolishDevelopment.
//    - getDevelopments.
//    - getMortgageStatus

const MAX_HOUSE_ON_PROPERTY = 4;
const { is } = require('./utils');

module.exports = class Property{
  constructor(options) {
    const { owner, id, position, type, location_code, title, ...details } = options;

    this._owner = owner;
    this._id = id;
    this._title = title;
    this._location_code = location_code;
    this._details = details;
    this._type = type;

    this._developments = null;
    this._isMortgage = false;
    this._isForSale = false;                        // i'm not sure what to do with this variable.
    
    // in my head, it's looking better than having to traverse the board...
    // instead, traverse the properties array, and use the positions variable
    // to place it on the board.
    // this way, it is deterministic (as is the game... duh?)
    this._position = position;
  }

  getPosition() {
    return this._position;
  }

  calculateRent() {
    const { _type } = this;

    switch (_type) {
      case 'property':
    
        break;

      case 'utility':
  
        break;
  
      case 'station':
  
        break;
    
      default:
        break;
    }
  }

  toggleMortgage() {
    this._isMortgage = !this._isMortgage;
    return true;
  }

  toggleSale() {
    this._isForSale = !this._isForSale;
    return;
  }

  buildDevelopment(developmentType, count = 1) {
    if (this._type !== 'property') {
      return false;
    }

    if (is("null", this._developments)) {
      count = count > 4 ? 4 : count;
      this._developments = ['house', count];
      return true;
    }

    const [oldType, oldCount] = this._developments;
    const totalCount = oldCount + count;
    if((developmentType == 'house' && oldType === 'hotel') ||
    (developmentType == 'hotel' && oldType === 'hotel')
    ) {
      return false;
    }

    if (developmentType === 'house') {
      count = totalCount > 4 ? 4 : totalCount;
      this._developments = ['house', count];
      return true;
    }

    if (developmentType === 'hotel' && oldType === 'house') {
      if (oldCount === 4) {
        this._developments = ['hotel', 1];
        return true;
      }
      return false;
    }
  }

  demolishDevelopment(factor = 1) {
    const { _developments } = this;
    const [type, count] = _developments;
    if (type === 'hotel') {
      _developments = ['house', 4];
    }

    if (type === 'house') {
      const diff = count - factor;
      if (diff <= 0) {
        _developments = null;
      } else {
        _developments = ['house', diff];
      }
    }
  }

  getDevelopments() {
    return this._developments;
  }

  getMortgageStatus() {
    return this._isMortgage;
  }
}
