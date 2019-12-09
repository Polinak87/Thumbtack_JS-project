import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {addSortingType} from '../../store/actions/sorting';
import store from '../../store/index';
import { addMarketThings } from '../../store/actions/marketThings';

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeSorting = this.handleChangeSorting.bind(this);
  }

  handleChangeSorting() {
    store.dispatch(addSortingType({ sortingType :event.target.value }));
    console.log(event.target.value);

    axios.get('/api/marketthings', {
      params: {
        filtrationType: this.props.filtrationType,
        sortingType: event.target.value,
      }
    })
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addMarketThings(map));
        console.log(map);
      });
  }

  render() {
    return (
      <div className="field">
        <div className="control is-expanded">
          <div className="is-inline select is-primary">
            <select onChange={this.handleChangeSorting}>
              <option key='by date descending' value='DESC'>by date descending</option>
              <option key='by date ascending' value='ASC'>by date ascending</option>
            </select>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  filtrationType: state.filtration.filtrationType,
  sortingType: state.sorting.sortingType,
});

export default connect(mapStateToProps)(Sorting);
