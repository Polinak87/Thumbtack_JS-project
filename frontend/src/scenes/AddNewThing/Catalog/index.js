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
  }

  render() {
    const { catalog } = this.props;
    const catalogArray = Array.from(catalog.values());

    let cardList = catalogArray.map(Thing => {
      const { id, name, image, description, Category } = Thing;
      const { name: categoryName } = Category;
      return (
        <Column key={id}>
          <Card
            image={image}
            id={id}
            name={name}
            description={description}
            categoryName={categoryName}
            onClick={this.onClick}
          />
        </Column>
      );
    });

    return <CardBlock cardList={cardList} />;
  }
}

const mapStateToProps = state => ({
  catalog: state.things.catalog,
  a: state.things.userThings,
});

const mapDispatchToProps = dispatch => ({
  getCatalog: () => dispatch(getCatalog()),
  addThingFromCatalog: id => dispatch(addThingFromCatalog(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
