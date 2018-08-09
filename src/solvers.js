/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.recurse = function(n, row, board, functionName, cb) {
  if (row === n) {
    return cb();
  }
  for (var colIdx = 0; colIdx < n; colIdx++) {
    board.togglePiece(row, colIdx);
    if (!board[functionName]()) {
      var result = recurse(n, row + 1, board, functionName, cb);
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, colIdx);
  }
};

window.findNRooksSolution = function(n) {
  var board = new Board({ n });
  var rows = board.rows();
  var solution = recurse(n, 0, board, 'hasAnyRooksConflicts', () =>
    rows.map(row => {
      return row.slice();
    })
  );
  console.log(`Single solution for ${n} rooks: ${JSON.stringify(solution)}`);
  return solution;
};

// psuedocode for solving this problem (decision tree/backtracking algo):
// base case - when solution has been reached (rows === n):
// deal with the solution
// stop the recursion

// recursive case - iterating over possible decisions
// make a decision
// check validity
// if valid, recursively check for solution
// undo the decision
window.countNRooksSolutions = function(n) {
  var board = new Board({ n });
  var counter = 0;
  recurse(n, 0, board, 'hasAnyRooksConflicts', () => {
    counter++;
  });
  console.log(`Number of solutions for ${n} rooks: ${counter}`);
  return counter;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({ n });
  var rows = board.rows();
  console.log(rows);
  var solution = recurse(n, 0, board, 'hasAnyQueensConflicts', () =>
    rows.map(row => {
      return row.slice();
    })
  );
  // If no solution exists, return the original unaltered board
  solution = solution || board.rows ();
  console.log(`Single solution for ${n} queens: ${JSON.stringify(solution)}`);
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({ n });
  var counter = 0;
  recurse(n, 0, board, 'hasAnyQueensConflicts', () => {
    counter++;
  });
  console.log(`Number of solutions for ${n} queens: ${counter}`);
  return counter;
};
