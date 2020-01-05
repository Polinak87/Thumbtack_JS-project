import React from 'react';
import { connect } from 'react-redux';
import ColumnsMultiline from '../../components/Columns/ColumnsMultiline';
import FilterByCategory from './FilterByCategory';
import Sorting from './Sorting';
import Card from '../../components/Card';
import ThingInfo from '../../components/Card/ThingInfo';
import Header from '../../components/Card/Header';
import Hero, { aquamarine } from '../../components/Hero';
import Button, { green, large } from '../../components/Button';
import InlineBlock from '../../components/InlineBlock';
import Label from '../../components/Label';
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

    let cardList = marketThingsArray.map(userThing => {
      const { Thing: thing, id, userId, User: user, onMarket, onMarketAt } = userThing;
      const { image, name, description, Category: category } = thing;
      const { name: categoryName } = category;
      const { firstName, lastName } = user;

      const header = (
        <Header
          to="/market-things-filtered-by-user"
          onClick={() => this.onTitleClick(userId)}
        >
          By {firstName} {lastName}
        </Header>
      );

      const button = () => {
        if (currentUserId === userId) {
          return;
        }
        return (
          <Button
            to="/things-for-exchange"
            className={`${large} ${green}`}
            id={id}
            userId={userId}
            onClick={this.onButtonClick}
          >
            Exchange
          </Button>
        );
      };

      return (
        <Card
          key={id}
          header={header}
          button={button()}
        >
          <ThingInfo
            id={id}
            image={image}
            name={name}
            description={description}
            categoryName={categoryName}
            onMarket={onMarket}
            onMarketAt={onMarketAt}
          />
        </Card>
      )
    });

    return (
      <div>
        <br />
        <Hero className={aquamarine} text="Market" />
        <br />
        <InlineBlock>
          <Label>Category</Label>
          <FilterByCategory />
          <Label>Sorting</Label>
          <Sorting />
        </InlineBlock>
        <br />
        <ColumnsMultiline>{cardList}</ColumnsMultiline>
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
