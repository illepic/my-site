var path = require('path');
var config = require(path.join(process.cwd(), 'config.js'));

module.exports = {
  // returns root relative path to file
  // in `src/components/header/index.jsx`:
  // `var logo = base.assetPath(__dirname, 'logo.png');`
  // `logo` would be `/assets/components/header/logo.png`
  assetPath: function(sourceDir, file) {
    return path.join(
      '/assets', 
      path.relative(
        config.dir.src, 
        path.join(sourceDir, file)
      )
    ); 
  }
};