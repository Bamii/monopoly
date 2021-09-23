const getType = o => {
  if(Buffer.isBuffer(o)) return 'Buffer';
  return Object.prototype.toString.call(o).split(' ')[1].slice(0, -1).toLowerCase();
};

const is = (type, value) => getType(value).toLowerCase() === type.toLowerCase();

const flatten = (obj, type = '') => {
  let top = [];
  for (let z in obj) {
    const val = obj[z];

    let root = [z];
    for (let value of val) {
      if (is('object', value)) {
        root.push(flatten(value));
      } else if (type === "all") {
        root.push(value);
      }
    }
    top.push(root);
    root = [];
  }
  return top;
}

function convToMonopolyMoney(money, acc = {}) {
  let denominations = [500, 100, 50, 20, 5, 1];
  denominations = denominations.filter(den => den <= money);
  
  let curr_denom = denominations[0];
  let remainder = money - curr_denom;
  let denom = acc[curr_denom] ? ++acc[curr_denom] : 1;

  acc = {
    ...acc,
    [curr_denom]:  denom
  }

  if (remainder > 0) {
    return convToMonopolyMoney(remainder, acc)
  }
  return acc;
}

function convToFlat(money){
  const entries = Array.from(Object.entries(money));
  return entries.reduce((prev, [denomination, count])=> prev + (count * denomination), 0);
}

function pipeline(...args) {
  for (let arg in args) {
    
  }
}

// console.log(convertToObj(352))
// console.log(convToFlat(convertToObj(353)))
// console.log(
//   Object.entries({ 500: 0, 100: 5, 50: 2, 10: 0, 5: 1, 1: 10 })
//   .filter(([denomination, count]) => count != 0)
//   .sort((a,b) => b[0] - a[0])
// )

module.exports = {
  is, getType, convToMonopolyMoney,
  convToFlat
}
