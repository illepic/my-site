const config = require('./config');
const join = require('path').join;

module.exports = {
  "paths" : {
    "source" : {
      "root": "./patternlab/source/",
      "patterns" : "./patternlab/source/_patterns/",
      "data" : "./patternlab/source/_data/",
      "meta": "./patternlab/source/_meta/",
      "annotations" : "./patternlab/source/_annotations/",
      "styleguide" : "./node_modules/styleguidekit-assets-default/dist/",
      "patternlabFiles" : "./node_modules/styleguidekit-mustache-default/views/",
      "js" : "./patternlab/source/js",
      "images" : "./patternlab/source/images",
      "fonts" : "./patternlab/source/fonts",
      "css" : "./patternlab/source/css/"
    },
    "public" : {
      "root" : join(config.paths.dist, 'patternlab'),
      "patterns" : join(config.paths.dist, 'patternlab', "patterns/"),
      "data" : join(config.paths.dist, 'patternlab', "styleguide/data/"),
      "annotations" : join(config.paths.dist, 'patternlab', "annotations/"),
      "styleguide" : join(config.paths.dist, 'patternlab', "styleguide/"),
      "js" : join(config.paths.dist, 'patternlab', "js"),
      "images" : join(config.paths.dist, 'patternlab', "images"),
      "fonts" : join(config.paths.dist, 'patternlab', "fonts"),
      "css" : join(config.paths.dist, 'patternlab', "css")
    }
  },
  "styleGuideExcludes": [
  ],
  "defaultPattern": "all",
  "defaultShowPatternInfo": false,
  "cleanPublic" : true,
  "patternExtension": "mustache",
  "ignored-extensions" : ["scss", "DS_Store", "less"],
  "ignored-directories" : ["scss"],
  "debug": false,
  "ishControlsHide": {
    "s": false,
    "m": false,
    "l": false,
    "full": false,
    "random": false,
    "disco": false,
    "hay": true,
    "mqs": false,
    "find": false,
    "views-all": false,
    "views-annotations": false,
    "views-code": false,
    "views-new": false,
    "tools-all": false,
    "tools-docs": false
  },
  "ishMinimum": "240",
  "ishMaximum": "2600",
  "patternStateCascade": ["inprogress", "inreview", "complete"],
  "patternStates": {
  },
  "patternExportPatternPartials": [],
  "patternExportDirectory": "./pattern_exports/",
  "cacheBust": true,
  "starterkitSubDir": "dist",
  "outputFileSuffixes": {
    "rendered": ".rendered",
    "rawTemplate": "",
    "markupOnly": ".markup-only"
  }
};
