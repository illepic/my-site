const plconfig = require('../patternlab-config');
const patternlab = require('patternlab-node');
const fs = require('fs-extra');

function setupStyleguide() {
  fs.copySync(plconfig.paths.source.styleguide, plconfig.paths.public.root);
  fs.copySync(plconfig.paths.source.css, plconfig.paths.public.css);
}

function build(done) {
  setupStyleguide();
  patternlab(plconfig).build(done, true);
}

module.exports = {
  build,
};
