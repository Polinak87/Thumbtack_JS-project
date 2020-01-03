import React from 'react';
import { connect } from 'react-redux';
import CardBlock from '../../components/CardBlock';
import FilterByCategory from './FilterByCategory';
import Sorting from './Sorting';
import Card from './Card';
import Hero, { aquamarine } from '../../components/Hero';
import Column from '../../components/Column';
import { getMarketThings, addThingForExchange } from '../../store/actions/things';
import {
  deleteFiltrationType,
  deleteSortingType,
  addFiltrationByUser,
} from '../../store/actions/main';

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
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

  onButtonClick(id, userId) {
    const { addThingForExchange } = this.props;
    addThingForExchange({
      idThingDesired: id,
      idUserAnswer: userId,
    });
  }

  onTitleClick(id) {
    const { addFiltrationByUser } = this.props;
    addFiltrationByUser({ id });
  }

  render() {
    const { currentUserId, marketThingsMap } = this.props;
    const marketThingsArray = Array.from(marketThingsMap.values());

    let cardList = marketThingsArray.map(MarketThing => {
      const { Thing, id, onMarketAt, userId, User } = MarketThing;
      const { image, name, description, Category } = Thing;
      const { name: categoryName } = Category;
      return (
        <Column key={MarketThing.id}>
          <Card
            image={image}
            id={id}
            name={name}
            description={description}
            categoryName={categoryName}
            onMarketAt={onMarketAt}
            /* проверить нужен ли в итоге юзер*/
            user={User}
            userId={userId}
            currentUserId={currentUserId}
            onButtonClick={this.onButtonClick}
            onTitleClick={this.onTitleClick}
          />
        </Column>
      );
    });

    return (
      <div>
        <br/>
        <Hero className={aquamarine} text="Market"/>
        <br/>
        <div className="is-inline-flex">
          <FilterByCategory/>
          <Sorting/>
        </div>
        <br/>
        <CardBlock cardList={cardList}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.id,
  marketThingsMap: state.things.marketThings,
  filtrationType: state.main.filterByCategory.category,
  sortingType: state.main.sortByDate.type,
});

const mapDispatchToProps = dispatch => ({
  getMarketThings: (filtrationType, sortingType) =>
    dispatch(getMarketThings(filtrationType, sortingType)),
  deleteFiltrationType: () => dispatch(deleteFiltrationType()),
  deleteSortingType: () => dispatch(deleteSortingType()),
  addThingForExchange: thingForExchange => dispatch(addThingForExchange(thingForExchange)),
  addFiltrationByUser: (id) => dispatch(addFiltrationByUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Market);
