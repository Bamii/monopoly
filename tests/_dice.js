const Dice = require('../core/dice');
let dice;

beforeAll(() => {
  dice = new Dice();
});

test('DICE TEST -->', () => {
  test('expect dice.roll to be a number x where 1 >= x <= 6', () => {
    const roll_dice = dice.roll();
    expect(roll_dice).toBeGreaterThanOrEqual(1);
    expect(roll_dice).toBeLessThanOrEqual(6);
  })
});
