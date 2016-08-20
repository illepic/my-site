const plconfig = require('../patternlab-config');
const patternlab = require('patternlab-node')(plconfig);
const fs = require('fs-extra');

function setupStyleguide() {
  fs.copySync(plconfig.paths.source.styleguide, plconfig.paths.public.root);
  fs.copySync(plconfig.paths.source.css, plconfig.paths.public.css);
}

function build(done) {
  setupStyleguide();
  patternlab.build(done, true);
}

module.exports = {
  build,
};
