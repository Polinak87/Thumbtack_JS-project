import React from 'react';
import axios from 'axios';
import store from '../../store';
import { connect } from 'react-redux';
import Card from './Card';
import CardBlock from '../../components/CardBlock';
import { getCatalog } from '../../store/actions/things';
import { addThingFromCatalog } from '../../store/actions/things';
import { addMessage } from '../../store/actions/main';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind();
  }

  componentDidMount() {
    const { getCatalog } = this.props;
    getCatalog();
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
            onClick={this.onClick} />
        </div>
      )
    };

    return (
      <CardBlock cardList={cardList} />
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.catalog,
});

const mapDispatchToProps = dispatch => ({
  getCatalog: () => dispatch(getCatalog()),
  addThingFromCatalog: (id) => dispatch(addThingFromCatalog(id)),
  dispatch,
});


export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
