'use strict';

const {solve, solveApi, checkApi} = require('../controllers/sudoku-solver.js');

module.exports = app => {

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body
      res.json(checkApi(puzzle, coordinate, value));
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      res.json(solveApi(req.body.puzzle));
    });
};