const Bank = require('../core/bank');
const Property = require('../core/property');
const wildcard = require('../core/wildcard');
const PROPERTY_STASH = [];
const CASH_STASH = [];
const WILDCARD_STASH = [];
let bank;

beforeAll(() => {
  bank = new Bank({ properties: "", cash: "" });
});

test('BANK TEST -->', () => {
  test(`expect a new Bank to have a properties stash with a length equal to the source data's contents.`, () => {
    expect(bank.getProperties()).toEqual(PROPERTY_STASH.length);
  });

  test(`expect a new Bank to have cash stash with a length equal to the source data's contents.`, () => {
    expect(bank.getProperties()).toEqual(CASH_STASH.length);
  });

  test(`expect a new Bank to have a wildcash stash with a length equal to the source data's contents.`, () => {
    expect(bank.getProperties()).toEqual(WILDCARD_STASH.length);
  });

  test('expect bank.mortgage(property) to add a property to the mortgage list', () => {
    let property;
    
    beforeAll(() => {
      // property setup.
      property = new Property({});
    });

    test("should add property to list if it's not present already", () => {
      expect(bank.getMortgages().length).toEqual(0);
      expect(property.getMortgageStatus()).toEqual(false);

      const mortgage = bank.mortgage(property);
      
      expect(mortgage).toEqual(true);
      expect(bank.getMortgages().length).toEqual(1);
      expect(bank.getMortgages()[0]).toBeInstanceOf(Property);
      expect(property.getMortgageStatus()).toEqual(true);
    });

    test("should not add property to list if it's already present", () => {
      expect(bank.getMortgages().length).toEqual(1);
      expect(bank.getMortgages()[0]).toEqual(property);
      expect(property.getMortgageStatus()).toEqual(true);

      const mortgage = bank.mortgage(property);

      expect(mortgage).toEqual(false);
      expect(bank.getMortgages().length).toEqual(1);
    });
  });

  test('expect bank.unMortgage(property) to unmortgage a property', () => {
    test("should remove the property from the list if it's present and return true", () => {
      expect(bank.getMortgages().length).toEqual(1);
      expect(property.getMortgageStatus()).toEqual(true);

      const unmortgage = bank.unMortgage(propery);
      
      expect(unmortgage).toEqual(true);
      expect(bank.getMortgages().length).toEqual(0);
      expect(property.getMortgageStatus()).toEqual(false);
    });

    test("should return false if that property is not in the list", () => {
      expect(bank.getMortgages().length).toEqual(0);

      const unmortgage = bank.unMortgage(property);

      expect(unmortgage).toEqual(false);
      expect(bank.getMortgages().length).toEqual(0);
      expect(property.getMortgageStatus()).toEqual(false);      
    });
  });

  
  test('expect bank.disburseCash() to distribute cash (according to a ruleset) to a player', () => {
    let player;
    let ruleset;
    beforeAll(() => {
      player = new Player({ name: 'bami', token: 'shoe' });
    });

    test("should distribute to player if they do not have cash", () => {
      expect(player.getTotalCash()).toEqual(0);
      
      const disburse = bank.disburseCash(player, ruleset);
      
      expect(disburse).toEqual(true);
      expect(player.getTotalCash()).toBeGreaterThan(0);
    })
    
    test("should not distribute to a player if they already have cash", () => {
      expect(player.getTotalCash()).toBeGreaterThan(0);

      const disburse = bank.disburseCash(player, ruleset);

      expect(disburse).toEqual(false);
    });
  });

  test('expect bank.payPlayer(player, cash) to pay a player some amount of money', () => {
    
  });

  test('expect updateCash(cash) to update the cash in the bank', () => {

  });

  test("expect getTotalCash() to return the numerical value of the bank's worth", () => {

  });
});
