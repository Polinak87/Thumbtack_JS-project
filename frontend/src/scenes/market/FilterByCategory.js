import React from 'react';
import axios from 'axios';
import store from '../../store/index';
import { connect } from 'react-redux';
import { addFiltrationType } from '../../store/actions/filtration';
import { addMarketThings } from '../../store/actions/marketThings';

class FilterByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
    }
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  componentDidMount() {
    axios.get('/api/category')
      .then((response) => {
        this.setState({ categoryList: response.data })
      });
  }

  handleChangeCategory() {
    store.dispatch(addFiltrationType({ filtrationType :event.target.value }));
    console.log(event.target.value);
    axios.get('/api/marketthings', {
      params: {
        filtrationType: event.target.value,
        sortingType: this.props.sortingType,
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
    let categoryOptons = [];
    this.state.categoryList.forEach((cat, index) => {
      categoryOptons.push(
        <option key={cat.id} value={cat.id}>{cat.name} </option>
      );
    });

    return (
      <div className="select is-primary">
        <select onChange={this.handleChangeCategory} value={this.state.categoryId}>
          {categoryOptons}
          <option key='0' value='all'>all </option>
        </select>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  filtrationType: state.filtration.filtrationType,
  sortingType: state.sorting.sortingType,
});

export default connect(mapStateToProps)(FilterByCategory);
