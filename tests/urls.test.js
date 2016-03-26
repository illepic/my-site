'use strict';
const assert = require('assert');
const request = require('request');
const paths = require('./paths');

let baseUrl = 'http://evanlovely.com';

describe('Get urls', function() {
  this.timeout(5000);
  paths.forEach(path => {
    it(path, function(done){
      request.get(baseUrl + path, (err, res) => {
        if (err) throw err;
        assert(200 === res.statusCode);
        if (path !== res.req.path) {
          console.log(`${path} => ${res.req.path}`);
        }
        done();
      });
    });
  });
});
