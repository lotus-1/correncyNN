const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

test('Tape is working', (t) => {
  t.equal(1, 1, 'Tape is working');
  t.end();
});

test('Home route returns a status code of 200', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'Should return 200');
      t.end();
    });
});

test('Convert route returns the currency value of the input currency', (t) => {
  supertest(router)
    .get('/convert?cur=USD')
    .expect('3.5997332148')
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, '3.5997332148', 'Should return 3.5997332148 when entering USD');
      t.end();
    });
});
