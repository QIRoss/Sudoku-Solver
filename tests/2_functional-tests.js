const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    suite('Solve a puzzle', () => {
        test('with valid puzzle string: POST request to /api/solve', done => {
            chai.request(server)
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.solution, '218396745753284196496157832531672984649831257827549613962415378185763429374928561' )
                    done();
                })
        });

        test('with missing puzzle string: POST request to /api/solve', done => {
            chai.request(server)
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, 'Required field missing' );
                    done();
                });
        });

        test('Solve a puzzle with invalid characters: POST request to /api/solve', done => {
            chai.request(server)
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..839.7.575.....964..1hh.....16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        test('Solve a puzzle with incorrect length: POST request to /api/solve', done => {
            chai.request(server)
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..839.7.575..964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long" )
                    done();
                })
        });

        test('with valid puzzle string: POST request to /api/solve', done => {
            chai.request(server)
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '.8839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, "Puzzle cannot be solved" )
                    done();
                })
        });
    });

    suite('Check a puzzle', () => {
        test('placement with all fields: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1',
                    value: '7'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.valid, true);
                    done();
                })
        });

        test('placement with single placement conflict: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1',
                    value: '3'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.conflict.length, 1);
                    done();
                })
        });

        test('placement with multiple placement conflicts: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1',
                    value: '5'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.conflict.length, 3);
                    done();
                })
        });

        test('placement with all placement conflicts: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1',
                    value: '5'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.conflict.length, 3);
                    done();
                })
        });

        test('placement with missing required fields: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, "Required field(s) missing");
                    done();
                })
        });

        test('placement with invalid characters: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
                    coordinate: 'ff',
                    value: '3'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, "Invalid coordinate");
                    done();
                })
        });

        test('placement with incorrect length: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..839.7.575.....964..1....16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
                    coordinate: 'A1',
                    value: '7'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                    done();
                })
        });

        test('placement with invalid placement coordinate: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
                    coordinate: 'ff',
                    value: '3'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, "Invalid coordinate");
                    done();
                })
        });

        test('placement with invalid placement value: POST request to /api/check', done => {
            chai.request(server)
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
                    coordinate: 'A1',
                    value: 'a'
                })
                .end((err,res) => {
                    assert.equal(res.status,200);
                    assert.equal(res.body.error, "Invalid value");
                    done();
                })
        });
    });

});

