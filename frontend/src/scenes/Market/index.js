import React from 'react';
import { connect } from 'react-redux';
import { getMarketThings } from '../../store/actions/things';
import { addThingForExchange } from '../../store/actions/things';
import { deleteFiltrationType } from '../../store/actions/main';
import { deleteSortingType } from '../../store/actions/main';
import CardBlock from '../../components/CardBlock';
import FilterByCategory from './FilterByCategory';
import Sorting from './Sorting';
import Card from './Card'
import Hero from '../../components/Hero';

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { getMarketThings, filtrationType, sortingType } = this.props;
    getMarketThings(filtrationType, sortingType);
  }

  componentWillUnmount() {
    const { deleteFiltrationType, deleteSortingType } = this.props;
    deleteFiltrationType();
    deleteSortingType();
  }

  onClick(id, userId) {
    this.props.addThingForExchange({
      idThingDesired: id,
      idUserAnswer: userId,
    });
    this.props.history.replace('/things-for-exchange');
  }

  render() {
    const { currentUserId, value } = this.props;
    let cardList = [];
    for (let userThing of value.values()) {
      const { Thing, id, onMarketAt } = userThing;
      const { image, name, description, Category } = Thing;
      const { name: categoryName } = Category;
      cardList.push(
        <div className="column is-one-quarter" key={userThing.id}>
          <Card
            image={image}
            id={id}
            name={name}
            description={description}
            categoryName={categoryName}
            onMarketAt={onMarketAt}
            /* проверить нужен ли в итоге юзер*/
            user={userThing.User}
            userId={userThing.userId}
            currentUserId={currentUserId}
            onClick={this.onClick} />
        </div>
      )
    };

    return (
      <>
        <br />
        <Hero text='Market' type="hero is-primary" />
        <br />
        <div className="is-inline-flex">
          <FilterByCategory />
          <Sorting />
        </div>
        <br />
        <CardBlock cardList={cardList} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.id,
  value: state.things.marketThings,
  filtrationType: state.main.filterByCategory.category,
  sortingType: state.main.sortByDate.type,
});

const mapDispatchToProps = dispatch => ({
  getMarketThings: (filtrationType, sortingType) => dispatch(getMarketThings(filtrationType, sortingType)),
  deleteFiltrationType: () => dispatch(deleteFiltrationType()),
  deleteSortingType: () => dispatch(deleteSortingType()),
  addThingForExchange: (thingForExchange) => dispatch(addThingForExchange(thingForExchange)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Market);