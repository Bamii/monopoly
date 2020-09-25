// -----
// Monopoly game
// - Ayobami Ayo-Salami
// - @bbamii
// -----
// map directions (classic)
// ---
// this is the directions for the traversal of the gameboard
// it is an array of pairs. we are building specifically for 11x11 boards.
// and this is just an easier way of traversing the board
// instead of doing 11X11 visits, we'll only be doing (4x9)+4 visits.
// the board map has numbers in each slot to determine what goes in each.

// ---
// alternative (plain)
// ---
// have the position variable on all of the properties.
// but going that way will mean we won't use a "map".
// just a plain ol' board (2D array).
// i think i'll go with this alternative... it's way lighter
// - still keeping this file though. 
// ---
module.exports = [
  [10, 10],
  [10, 9],
  [10, 8],
  [10, 7],
  [10, 6],
  [10, 5],
  [10, 4],
  [10, 3],
  [10, 2],
  [10, 1],
  [10, 0],
  [9, 0],
  [8, 0],
  [7, 0],
  [6, 0],
  [5, 0],
  [4, 0],
  [3, 0],
  [2, 0],
  [1, 0],
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [0, 9],
  [0, 10],
  [1, 10],
  [2, 10],
  [3, 10],
  [4, 10],
  [5, 10],
  [6, 10],
  [7, 10],
  [8, 10],
  [9, 10],
];
