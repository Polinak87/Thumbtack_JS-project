import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import CardBlock from '../../../components/CardBlock';
import Column from '../../../components/Column';
import { getCatalog } from '../../../store/actions/things';
import { addThingFromCatalog } from '../../../store/actions/things';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { getCatalog } = this.props;
    getCatalog();
  }

  onClick(id) {
    const { addThingFromCatalog } = this.props;
    addThingFromCatalog(id);
  };

  render() {
    let cardList = [];
    for (let Thing of this.props.value.values()) {
      cardList.push(
        <Column key={Thing.id}>
          <Card
            image={Thing.image}
            id={Thing.id}
            name={Thing.name}
            description={Thing.description}
            categoryName={Thing.Category.name}
            onClick={this.onClick} />
        </Column>
      )
    };

    return (
      <CardBlock cardList={cardList} />
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.catalog,
  a: state.things.userThings,
});

const mapDispatchToProps = dispatch => ({
  getCatalog: () => dispatch(getCatalog()),
  addThingFromCatalog: (id) => dispatch(addThingFromCatalog(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
