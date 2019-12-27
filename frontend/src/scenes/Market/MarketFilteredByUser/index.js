import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import Hero, {aquamarine} from '../../../components/Hero';
import { getMarketThingsOfOneUser } from '../../../store/actions/things';
import { addThingForExchange } from '../../../store/actions/things';
import CardBlock from '../../../components/CardBlock';
import Column from '../../../components/Column';

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
    this.props.addThingForExchange({
      idThingDesired: id,
      idUserAnswer: userId,
    });
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
            onClick={this.onClick}
          />
        </Column>
      );
    });

    return (
      <>
        <br />
        <Hero className={aquamarine} text="Market of User" />
        <br />
        <CardBlock cardList={cardList} />
      </>
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
