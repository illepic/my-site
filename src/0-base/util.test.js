/* global describe, it */
const util = require('./util');
const assert = require('assert');

describe('isPathRemote', () => {
  [{
    url: 'http://g.co/a.jpg',
    expect: true,
  }, {
    url: 'https://g.co/a.jpg',
    expect: true,
  }, {
    url: '//g.co/a.jpg',
    expect: true,
  }, {
    url: '/a.jpg',
    expect: false,
  }, {
    url: 'a.jpg',
    expect: false,
  }, {
    url: 'a/b.jpg',
    expect: false,
  }].forEach(item => {
    it(item.url, () => assert(util.isPathRemote(item.url) === item.expect));
  });
});

describe('isPathRootRelative', () => {
  [{
    url: 'http://g.co/a.jpg',
    expect: false,
  }, {
    url: 'https://g.co/a.jpg',
    expect: false,
  }, {
    url: '//g.co/a.jpg',
    expect: false,
  }, {
    url: '/a.jpg',
    expect: true,
  }, {
    url: '/a/b.jpg',
    expect: true,
  }, {
    url: 'a.jpg',
    expect: false,
  }, {
    url: './a/b.jpg',
    expect: false,
  }, {
    url: 'a/b.jpg',
    expect: false,
  }].forEach(item => {
    it(item.url, () => assert(util.isPathRootRelative(item.url) === item.expect));
  });
});

describe('getTags', () => {
  const sampleTags = [
    { tags: ['Alfred', 'productivity'] },
    { tags: ['Alfred', 'web-dev', 'productivity'] },
    { tags: ['Mac', 'iPhone', 'Mac'] },
    { tags: ['Alfred', 'productivity'] },
    { tags: ['Alfred', 'Mac'] },
    { tags: ['Alfred'] },
    { tags: ['Alfred', 'productivity'] },
  ];

  it('sorts tags by frequency', () => {
    const expected = [
      { name: 'Alfred', count: 6 },
      { name: 'productivity', count: 4 },
      { name: 'Mac', count: 3 },
      { name: 'web-dev', count: 1 },
      { name: 'iPhone', count: 1 },
    ];

    return assert.deepStrictEqual(util.getTags(sampleTags), expected);
  });

  it('sorts tags by name', () => {
    const expected = [
      { name: 'Alfred', count: 6 },
      { name: 'iPhone', count: 1 },
      { name: 'Mac', count: 3 },
      { name: 'productivity', count: 4 },
      { name: 'web-dev', count: 1 },
    ];

    return assert.deepStrictEqual(util.getTags(sampleTags, { sortBy: 'name' }), expected);
  });
});
