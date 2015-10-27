var React = require('react');
var Header = require('../components/header/index.jsx');

var Site = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        
        <body>
          <Header />
          {this.props.children}
          <script src="/js/bundle--default.js"></script>
        </body>
      </html>
    )
  }
});
      
module.exports = Site;
      