/* global describe, it */
const assert = require('assert');
const buildJson = require('./buildJson');

describe('buildJson', () => {
  it('datePrep parses string date', () => {
    const actual = buildJson.datePrep('2016-08-07');
    const expected = {
      day: '7',
      month: 'Aug',
      year: '2016',
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('datePrep parse date type', () => {
    const actual = buildJson.datePrep(new Date('2016-08-07'));
    const expected = {
      day: '7',
      month: 'Aug',
      year: '2016',
    };
    assert.deepStrictEqual(actual, expected);
  });
});
