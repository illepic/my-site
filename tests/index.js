var tape = require('tape');
var base = require('../src/base/');

tape('base helper functions', function(t) {
  t.plan(1);
  //t.equal('a', 'a');
  t.equal(base.assetPath(__dirname, 'file.png'), '/tests/file.png');
});