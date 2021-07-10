// solveSudoku Rosetta Code Solution
const sudoku = require('./sudoku.js').solveSudoku

// from geeksForGeeks
function gridStr(str){
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

export function solve(puzzleString) {
    const solution = sudoku(gridStr(puzzleString));
    let array = [];
    for(let i=0;i<9;i++)
        for(let j=0;j<9;j++)
            array.push(String(solution[i][j]))
    return array.join('');
}

export function solveApi(puzzle){
    if(!puzzle){
        return ({ error: 'Required field missing' });
      }

      if(puzzle.length !== 81){
        return ({ error: 'Expected puzzle to be 81 characters long' });
      }

      // change by regex latter
      for(let i=0;i<81;i++)
        if(puzzle[i] !== '.' && puzzle[i]*1 != puzzle[i]){
          return ({ error: 'Invalid characters in puzzle' });
        }
      
      try{
        const solution = solve(puzzle);
        return ({
          solution: solution
        });
      } catch {
        return ({ error: 'Puzzle cannot be solved' })
      }
}

export function checkApi(puzzle, coordinate, value){
    if(!puzzle || !coordinate || !value){
        return ({error: 'Required field(s) missing' });
        return;
      }

      if(puzzle.length !== 81){
        return ({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }

      // change by regex latter
      for(let i=0;i<81;i++)
        if(puzzle[i] !== '.' && puzzle[i]*1 != puzzle[i]){
          return ({ error: 'Invalid characters in puzzle' });
          return;
        } 

      if(coordinate[0] < 'A' || coordinate[0] > 'I' || Number(coordinate[1]) < 1 || Number(coordinate[1]) > 9 || coordinate.length !== 2){
        return ({ error: 'Invalid coordinate'});
        return;
      }

      if(value < '1' || value > '9'){
        return ({ error: 'Invalid value' });
        return;
      }

      const solution = solve(puzzle);

      const coordinatesAllowed = 'ABCDEFGHI';

      const row = coordinatesAllowed.indexOf(coordinate[0]);
      const col = coordinate[1] * 1 - 1;

      if(value == solution[9*row + col]){
        return ({valid: true})
        return;
      }

      const conflicts = [];

      // checkRow
      const actualRow = row*9;
      for(let i=actualRow;i<actualRow+9;i++){
        if(puzzle[i] == value && (i - actualRow*9) != col){
          conflicts.push("row");
        }
      }
      // check column
      for(let i=col;i<81;i+=9){
        if(puzzle[i + row*9] == value && i != (row*9 + col)){
          conflicts.push("column");
        }
      }
      // check region
      const location = row*9 + col*1;
      const region1 = [0,1,2,9,10,11,18,19,20];
      const region2 = [3,4,5,12,13,14,21,22,23];
      const region3 = [6,7,8,15,16,17,24,25,26];
      const region4 = [27,28,29,36,37,38,45,46,47];
      const region5 = [30,31,32,39,40,41,48,49,50];
      const region6 = [33,34,35,42,43,44,51,52,53];
      const region7 = [54,55,56,63,64,65,72,73,74];
      const region8 = [57,58,59,66,67,68,75,76,77];
      const region9 = [60,61,62,69,70,71,78,79,80];

      const regions = [region1,region2,region3,region4,region5,region6,region7,region8,region9];
      let region = [];

      regions.forEach(el => {
        if(el.includes(location)){
          region = el;
        }
      })

      for(let i=0;i<9;i++){
        let actual = region[i];
        if(puzzle[actual] == value && region[i] != location){
          conflicts.push("region");
        }
      }
      // final response
      return ({
        valid: false,
        conflict: conflicts
      });
}