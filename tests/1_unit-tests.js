const chai = require('chai');
const assert = chai.assert;

const solver = require('../controllers/sudoku-solver.js');

suite('UnitTests', () => {

    suite('Logic handles', () => {
        test('a valid puzzle string of 81 characters', done => {
            const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solveApi(input).solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
            done();
        });

        test('a puzzle string with invalid characters (not 1-9 or .)', done => {
            const input = '1.5..2.84..63.12.7.2..5.....9..1hh..8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solveApi(input).error, 'Invalid characters in puzzle');
            done();
        });

        test('a puzzle string that is not 81 characters in length', done => {
            const input = '1.5..2.84..63.12.7.2..5...9..1hh..8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solveApi(input).error, 'Expected puzzle to be 81 characters long');
            done();
        });

        test('a valid row placement', done => {
            const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.checkApi(input, 'A1', 7).valid, true);
            done();
        });

        test('an invalid row placement', done => {
            const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.checkApi(input, 'D3', 3).conflict[0], 'row');
            done();
        });

        test('a valid column placement', done => {
            const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.checkApi(input, 'E1', 3).valid, true);
            done();
        });

        test('an invalid column placement', done => {
            const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.checkApi(input, 'F1', 5).conflict[0], 'column');
            done();
        });

        test('a valid region (3x3 grid) placement', done => {
            const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.checkApi(input, 'D4', 5).valid, true);
            done();
        });

        test('an invalid region (3x3 grid) placement', done => {
            const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.checkApi(input, 'A1', 3).conflict[0], 'region');
            done();
        });
    });


    test('Valid puzzle strings pass the solver', done => {
        const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.equal(solver.solveApi(input).solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        done();
    });

    test('Invalid puzzle strings fail the solver', done => {
        const input = '..9..5.1.85.4....24322.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.solveApi(input).error, "Puzzle cannot be solved" );
        done();
    });

    test('Solver returns the expected solution for an incomplete puzzle', done => {
        const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.equal(solver.solveApi(input).solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        done();
    });
});
