import React from 'react';
import { connect } from 'react-redux';
import { addSortingType } from '../../store/actions/main';
import { getMarketThings } from '../../store/actions/things';

function Sorting(props) {
  const onChange = () => {
    const { addSortingType, getMarketThings, filtrationType } = props;
    const sortingType = event.target.value;
    addSortingType({ sortingType });
    getMarketThings(filtrationType, sortingType);
  }

  return (
    <div className="field">
      <div className="control is-expanded">
        <div className="select is-primary">
          <select onChange={onChange}>
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

const mapStateToProps = state => ({
  filtrationType: state.main.filterByCategory.category,
});

const mapDispatchToProps = dispatch => ({
  addSortingType: type => dispatch(addSortingType(type)),
  getMarketThings: (filtrationType, sortingType) =>
    dispatch(getMarketThings(filtrationType, sortingType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
