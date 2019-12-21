import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../../store/index';
import Card from './Card';
import CardBlock from '../../components/CardBlock';
import { addCatalog } from '../../store/actions/things';
import { addMessage } from '../../store/actions/main';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/api/catalog')
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing);
        })
        store.dispatch(addCatalog(map));
      });
  }

  onClick(id) {
    axios.post('api/addthingfromcatalog', { id })
    .then((response) => {
      if (response.status = 200) {
        store.dispatch(addMessage({text: 'Thing is added to your inventory.'}));
      }
    });
  }

  render() {
    let cardList = [];
    for (let Thing of this.props.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={Thing.id}>
          <Card
            image={Thing.image}
            id={Thing.id}
            name={Thing.name}
            description={Thing.description}
            categoryName={Thing.Category.name}
            onClick={this.onClick}/>
        </div>
      )
    };

    return (
      <CardBlock cardList={cardList}/>
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.catalog,
});

export default connect(mapStateToProps)(Catalog);
