var React = require('react');
var Site = require('./site.jsx');

var Page = React.createClass({
  render: function() {
    return (
      <Site title={this.props.title} styleFiles={["/assets/style--post.css"]} scriptFiles={["/assets/bundle--post.js"]}>
        <h2>Post: {this.props.title}</h2>
        <p>Date: {this.props.date.toString()}</p>
        <div dangerouslySetInnerHTML={{__html: this.props.contents}}></div>
      </Site>
    );
  }
});

//var result = ReactDOMServer.renderToStaticMarkup(<Page info="data test" />);
//console.log(result);

module.exports = Page;
