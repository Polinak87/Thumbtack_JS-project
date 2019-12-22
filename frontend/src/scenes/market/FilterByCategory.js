import React from 'react';
import { connect } from 'react-redux';
import { addFiltrationType } from '../../store/actions/main';
import { getMarketThings } from '../../store/actions/things';
import { getCategories } from '../../store/actions/main';

class FilterByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  onChange() {
    const { sortingType, getMarketThings, addFiltrationType } = this.props;
    const filtrationType = event.target.value;
    addFiltrationType({ category: filtrationType });
    getMarketThings(filtrationType, sortingType);
  }

  render() {
    const { categoryList } = this.props;
    let categoryOptons = [];
    categoryList.forEach((cat, index) => {
      categoryOptons.push(
        <option key={cat.id} value={cat.id}>{cat.name} </option>
      );
    });

    return (
      <div className="select is-primary">
        <select onChange={this.onChange}>
          <option key='0' value='all'>all </option>
          {categoryOptons}
        </select>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  categoryList: state.main.categories,
  filtrationType: state.main.filterByCategory.category,
  sortingType: state.main.sortByDate.type,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  addFiltrationType: (filtrationType) => dispatch(addFiltrationType(filtrationType)),
  getMarketThings: (filtrationType, sortingType) => dispatch(getMarketThings(filtrationType, sortingType)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterByCategory);
