var React = require('react');
//var ReactDOMServer = require('react-dom/server');
var Site = require('./site.jsx');

var Page = React.createClass({
  render: function() {
    return (
      <Site title={this.props.title} styleFiles={["/assets/style--default.css"]} scriptFiles={["/assets/bundle--default.js"]}>
        <div>{this.props.title}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.contents}}></div>
      </Site>
    );
  }
});

//var result = ReactDOMServer.renderToStaticMarkup(<Page info="data test" />);
//console.log(result);

module.exports = Page;
