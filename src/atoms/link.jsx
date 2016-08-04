const React = require('react');

const Link = class extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const history = require('../../lib/history'); // eslint-disable-line global-require
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

    document.body.classList.add('is-loading');

    if (this.props.href) {
      history.push(this.props.href);
    } else {
      history.push({
        pathname: event.currentTarget.pathname,
        search: event.currentTarget.search,
      });
    }
  }

  render() {
    // const {to, ...props} = this.props; // eslint-disable-line no-use-before-define
    return <a {...this.props} onClick={this.handleClick}>{this.props.children}</a>;
  }
};

Link.propTypes = {
  href: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
};

module.exports = Link;
