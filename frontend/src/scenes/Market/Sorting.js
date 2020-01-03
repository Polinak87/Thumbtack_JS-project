import React from 'react';
import { connect } from 'react-redux';
import { addSortingType } from '../../store/actions/main';
import { getMarketThings } from '../../store/actions/things';
import Select, { aquamarine } from '../../components/Select';

function Sorting(props) {
  const onChange = () => {
    const { addSortingType, getMarketThings, filtrationType } = props;
    const sortingType = event.target.value;
    addSortingType({ sortingType });
    getMarketThings(filtrationType, sortingType);
  }

  const type = {
    DESC: 'by date descending',
    ASC: 'by date ascending',
  }

  let categoryOptons = [];

  for (let variant in type) {
    categoryOptons.push(
      <option key={type[variant]} value={variant}>
        {type[variant]}
      </option>
    )
  }

  return (
    <Select className={aquamarine} categoryOptons={categoryOptons} onChange={onChange}/>
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
