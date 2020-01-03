import React from 'react';
import { connect } from 'react-redux';
import { addFiltrationType, getCategories } from '../../store/actions/main';
import { getMarketThings } from '../../store/actions/things';
import Select, { aquamarine } from '../../components/Select';

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
    let categoryOptons = categoryList.map(cat => {
      return (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      );
    });
    categoryOptons.push(
      <option key="0" value="all">
        all
      </option>
    );

    return (
      <Select className={aquamarine} categoryOptons={categoryOptons} onChange={this.onChange}/>
    );
  }
}

const mapStateToProps = state => ({
  categoryList: state.main.categories,
  filtrationType: state.main.filterByCategory.category,
  sortingType: state.main.sortByDate.type,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  addFiltrationType: filtrationType => dispatch(addFiltrationType(filtrationType)),
  getMarketThings: (filtrationType, sortingType) =>
    dispatch(getMarketThings(filtrationType, sortingType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterByCategory);
