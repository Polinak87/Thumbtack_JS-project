import React from 'react';
import { connect } from 'react-redux';
import { addSortingType } from '../../store/actions/sorting';
import { getMarketThings } from '../../store/actions/marketThings';

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const { addSortingType, getMarketThings, filtrationType } = this.props;
    const sortingType = event.target.value;
    addSortingType({ sortingType });
    getMarketThings(filtrationType, sortingType);
  }

  render() {
    return (
      <div className="field">
        <div className="control is-expanded">
          <div className="is-inline select is-primary">
            <select onChange={this.onChange}>
              <option key="by date descending" value="DESC">
                by date descending
              </option>
              <option key="by date ascending" value="ASC">
                by date ascending
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filtrationType: state.main.filterByCategory.category,
});

const mapDispatchToProps = dispatch => ({
  addSortingType: (type) => dispatch(addSortingType(type)),
  getMarketThings: (filtrationType, sortingType) => dispatch(getMarketThings(filtrationType, sortingType)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
