import React from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Card';
import Header from '../../../components/Card/Header'
import Hero, { aquamarine } from '../../../components/Hero';
import ColumnsMultiline from '../../../components/Columns/ColumnsMultiline';
import Button, { green, large } from '../../../components/Button';
import { getMarketThingsOfOneUser, addThingForExchange } from '../../../store/actions/things';

class MarketFilteredByUser extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { filtrationByUser, getMarketThingsOfOneUser } = this.props;
    getMarketThingsOfOneUser(filtrationByUser);
  }

  onClick(id, userId) {
    const { addThingForExchange } = this.props;
    addThingForExchange({
      idThingDesired: id,
      idUserAnswer: userId,
    });
  }

  render() {
    const { currentUserId, marketThingsMap } = this.props;
    const marketThingsArray = Array.from(marketThingsMap.values());

    let cardList = marketThingsArray.map(userThing => {
      const { Thing:thing, id, userId,  User:user, onMarket, onMarketAt } = userThing;
      const { image, name, description, Category:category } = thing;
      const { name: categoryName } = category;
      const { firstName, lastName } = user;

      const header = (
        <Header>
          <div className="card-header-title has-text-grey is-centered is-italic is-size-3">
            By {firstName} {lastName}
          </div>
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
            onClick={this.onClick}
          >
            Exchange
          </Button>
        );
      };
      return (
        <Card 
        key={id}
        header={header}
        id={id}
        image={image}
        name={name}
        description={description}
        categoryName={categoryName}
        onMarket={onMarket}
        onMarketAt={onMarketAt}
        button={button()}
        />
      )
    });

    return (
      <div>
        <br />
        <Hero className={aquamarine} text='Market of user' />
        <br />
        <ColumnsMultiline>{cardList}</ColumnsMultiline>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.id,
  marketThingsMap: state.things.marketThingsOfOneUser,
  filtrationByUser: state.main.filterbyUser.id,
});

const mapDispatchToProps = dispatch => ({
  getMarketThingsOfOneUser: user => dispatch(getMarketThingsOfOneUser(user)),
  addThingForExchange: thingForExchange => dispatch(addThingForExchange(thingForExchange)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketFilteredByUser);
