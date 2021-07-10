// solveSudoku Rosetta Code Solution
const sudoku = require('./sudoku.js').solveSudoku

class SudokuSolver {

  // from geeksForGeeks
  gridStr(str){
      let l = str.length;
      let k = 0, row, column;
      row = Math.floor(Math.sqrt(l));
      column = Math.ceil(Math.sqrt(l));
 
      if (row * column < l){
          row = column;
      }
 
      let s = new Array(row);
      for (let i = 0; i < row; i++){
          s[i] = new Array(column);
          for (let j = 0; j < column; j++)
          {
              s[i][j] = 0;
          }
      }
      
      for (let i = 0; i < row; i++){
          for (let j = 0; j < column; j++){
              if(k < str.length)
                  s[i][j] = str[k];
              k++;
          }
      }
 
      return s;
  }

  solve(puzzleString) {
    const solution = sudoku(this.gridStr(puzzleString));
    let array = [];
    for(let i=0;i<9;i++)
      for(let j=0;j<9;j++)
        array.push(String(solution[i][j]))
    return array.join('');
  }
}

module.exports = SudokuSolver;

