var React = require('react');
var Header = require('../components/header/index.jsx');
require('./typography.scss');

var Site = React.createClass({
  render: function() {
    var styleTags = this.props.styleFiles.map(function(styleFile, index) {
      return (
        <link href={styleFile} rel="stylesheet" data-key={index} />
      );
    });
    var scriptTags = this.props.scriptFiles.map(function(scriptFile, index) {
      return (
        <script src={scriptFile} data-key={index}></script>
      );
    });
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          {styleTags}
        </head>
        
        <body>
          <Header />
          {this.props.children}
          <script src="/assets/bundle--vendor.js"></script>
          {scriptTags}
        </body>
      </html>
    )
  }
});
      
module.exports = Site;
      