var React = require('react');
var Header = require('../components/header/index.jsx');

var Site = React.createClass({
  render: function () {
    //var styleTags = this.props.styleFiles.map(function(styleFile, index) {
    //  return (
    //    <link href={styleFile} rel="stylesheet" key={index} />
    //  );
    //});
    //var scriptTags = this.props.scriptFiles.map(function(scriptFile, index) {
    //  return (
    //    <script src={scriptFile} key={index}></script>
    //  );
    //});
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
});

module.exports = Site;
