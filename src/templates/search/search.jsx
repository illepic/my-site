const React = require('react');
const Default = require('../default/default');

const Search = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: 'old'
    };
  }
  componentDidMount() {
    this.setState({
      subtitle: 'new'
    });
  }
  render() {
    return (
      <Default {...this.props}>
      <div className="search">
        <h1>Title: {this.props.title}</h1>
        <h1>SubTitle: {this.state.subtitle}</h1>
        <h2>Ima Search Page</h2>
      </div>
      </Default>
    );
  }
};

module.exports = Search;
