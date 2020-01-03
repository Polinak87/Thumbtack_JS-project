import React from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Card';
import ColumnsMultiline from '../../../components/ColumnsMultiline';
import Button, { green, large } from '../../../components/Button';
import { getCatalog, addThingFromCatalog } from '../../../store/actions/things';

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

    let cardList = catalogArray.map(thing => {
      const { id, image, name, description, Category:category } = thing;
      const { name: categoryName } = category;
      const button = (
        <Button className={`${large} ${green}`} id={id} onClick={this.onClick}>
          Add to inventory
        </Button>
      );
      return (
        <Card 
        key={id}
        id={id}
        image={image}
        name={name}
        description={description}
        categoryName={categoryName}
        button={button}
        />
      );
    });

    return <ColumnsMultiline>{cardList}</ColumnsMultiline>
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
