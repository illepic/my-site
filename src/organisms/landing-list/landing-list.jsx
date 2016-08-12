const React = require('react');
const Card = require('../../molecules/card/card');
const Meta = require('../../molecules/meta');
const util = require('../../0-base/util');

const LandingList = class extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagsForm = this.handleTagsForm.bind(this);
    this.toggleLayout = this.toggleLayout.bind(this);
    this.state = {
      tags: '',
      mounted: false,
      // rows: this.props.landingListRows,
      isGrid: !this.props.landingListRows,
    };
  }

  componentWillMount() {
    this.setState({ mounted: true });
  }

  componentWillReceiveProps() {
    this.setState({ tags: '' });
  }

  handleTagsForm(event) {
    this.setState({
      tags: event.target.value,
    });
  }

  toggleLayout() {
    this.setState({
      isGrid: !this.state.isGrid,
    });
  }

  render() {
    const list = this.props.items
      .filter(item => item.tags && item.tags.some(tag =>
        tag.toLowerCase().startsWith(this.state.tags.toLowerCase()))
      )
      .map(item => {
        let contents = '';
        if (this.props.showExcerpts && item.excerpt) {
          const excerpt = item.excerpt;
          contents = (<div
            className="card__excerpt"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></div>);
        }
        return (<Card
          {...item}
          path={item.path}
          key={item.path}
          className={contents
            ? 'landing-list__item'
            : 'landing-list__item landing-list__item--excerptless'}
        >
          <Meta {...item} />
          {contents}
        </Card>);
      });
    // let isGrid = !this.props.landingListRows;
    const classList = [
      'landing-list',
      `landing-list--${this.props.section}`,
    ];
    // if (isGrid) classList.push('smart-grid');

    let filter;
    if (this.props.showFilter && this.state.mounted) {
      filter = (
        <div className="filter landing-list__filter landing-list__header__item">
          <select
            onChange={this.handleTagsForm}
            value={this.state.tags}
          >
            <option value="">Filter by Tag</option>
            {util.getTags(this.props.items).map((tag, i) =>
              <option value={tag.name} key={i}>{tag.name}</option>)}
          </select>
        </div>
      );
    }

    let toggle;
    if (this.props.showToggle && this.state.mounted) {
      toggle = (
        <div className="toggle landing-list__header__item">
          <button
            onClick={this.toggleLayout}
          >Toggle Layout</button>
        </div>
      );
    }
    return (
      <section className={classList.join(' ')}>
        <header className="landing-list__header">
          {filter}
          {toggle}
        </header>
        <div
          className={`landing-list__content${this.state.isGrid ? ' smart-grid' : ''}`}
          data-row-items-small="2"
          data-row-items-large="3"
        >
          {list}
        </div>
      </section>
    );
  }
};

LandingList.defaultProps = {
  showExcerpts: true,
  showFilter: true,
  showToggle: true,
};

LandingList.propTypes = {
  items: React.PropTypes.array.isRequired,
  landingListRows: React.PropTypes.bool,
  section: React.PropTypes.string,
  showExcerpts: React.PropTypes.bool,
  showFilter: React.PropTypes.bool,
  showToggle: React.PropTypes.bool,
};

module.exports = LandingList;
