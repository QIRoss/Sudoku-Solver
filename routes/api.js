'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      const solver = new SudokuSolver();
  
      if(!puzzle){
        res.json({ error: 'Required field missing' });
        return;
      }

      if(puzzle.length !== 81){
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }

      // change by regex latter
      for(let i=0;i<81;i++)
        if(puzzle[i] !== '.' && puzzle[i]*1 != puzzle[i]){
          res.json({ error: 'Invalid characters in puzzle' });
          return;
        }

      try{
        const solution = solver.solve(puzzle);
        res.json({
          solution: solution
        });
      } catch {
        res.json({ error: 'Puzzle cannot be solved' })
      }

      
    });
};
