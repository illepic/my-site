var React = require('react');
var Site = require('../global/site.jsx');
var he = require('he');

var Page = React.createClass({
  getInitialState() {
    return this.props; //pulled from src/index.html
  },

  clickHandler() {
    //this demos a simple client side change

    var value = this.refs.inputData.getDOMNode().value;

    this.setState({
      contents: 'The template was changed through a client side template. Note that the input was not cleared.',
      inputValue: value
    });
  },

  render: function() {
    var myDate = 'no date';
    if (this.props.date) {
      myDate = this.props.date.toString();
    }
    return (
      <Site title={this.props.title}>
        <h2>Post: {this.props.title}</h2>
        <p>Date : {myDate} - {this.state.inputValue}</p>
        <input ref='inputData' />
        <button onClick={this.clickHandler}>Submit</button>
        <div dangerouslySetInnerHTML={{__html: this.props.contents}}></div>
        <div style={{display: 'none'}}
          id='props'
          dangerouslySetInnerHTML={{__html: he.encode(JSON.stringify(this.props))}}>
        </div>
      </Site>
    );
  }
});

//var result = ReactDOMServer.renderToStaticMarkup(<Page info="data test" />);
//console.log(result);

module.exports = Page;
