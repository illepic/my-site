'use strict';
const assert = require('assert');
const request = require('request');

let baseUrl = 'http://evanlovely.com';

describe('Get urls', function(){
  it('has live links', function(done){
    request.get(baseUrl + '/index.html', (err, res) => {
      assert(200 === res.statusCode);
      done();
    })
  });
});