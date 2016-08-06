const React = require('react');
const Markdown = require('../../global/markdown');

const Default = props => <Markdown contents={props.contents} />;

Default.propTypes = {
  contents: React.PropTypes.string.isRequired,
};

module.exports = Default;
