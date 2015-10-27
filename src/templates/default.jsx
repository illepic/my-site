var React = require('react');
var Site = require('../global/site.jsx');

var Page = React.createClass({
  render: function() {
    return (
      <Site title={this.props.title} styleFiles={["/assets/style--default.css"]} scriptFiles={["/assets/bundle--default.js"]}>
        <h2>{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.contents}}></div>
      </Site>
    );
  }
});

//var result = ReactDOMServer.renderToStaticMarkup(<Page info="data test" />);
//console.log(result);

module.exports = Page;
