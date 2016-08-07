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
