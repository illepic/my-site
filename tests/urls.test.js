'use strict';
const assert = require('assert');
const request = require('request');
const paths = require('./paths');
const yaml = require('js-yaml');
const fs = require('fs-extra');
const url = require('url');
const config = require('../config');
const themeConfig = yaml.safeLoad(fs.readFileSync('./config.theme.yml', 'utf8'));

let host = 'http://evanlovely.com';
// host = `http://localhost:${themeConfig.browserSync.port}`;

describe('Get urls', function() {
  this.timeout(5000);
  paths.forEach(aPath => {
    it(aPath, function(done){
      request.get(url.resolve(host, aPath), (err, res) => {
        if (err) throw err;
        assert(200 === res.statusCode);
        done();
      });
    });
  });
});
