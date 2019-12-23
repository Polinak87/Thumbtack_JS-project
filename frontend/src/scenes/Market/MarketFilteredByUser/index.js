import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card'
import Hero from '../../../components/Hero';
import store from '../../../store/index';
import { getMarketThingsOfOneUser } from '../../../store/actions/things';
import { addThingForExchange } from '../../../store/actions/things';
import CardBlock from '../../../components/CardBlock';

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
    this.props.history.replace('/things-for-exchange');
  }


  render() {
    let currentUserId = store.getState().user.id;
    let cardList = [];
    for (let userThing of this.props.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={userThing.id}>
          <Card
            image={userThing.Thing.image}
            id={userThing.id}
            name={userThing.Thing.name}
            description={userThing.Thing.description}
            categoryName={userThing.Thing.Category.name}
            onMarketAt={userThing.onMarketAt}
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
        <Hero text='Market of User' type="hero is-primary" />
        <br />
        <CardBlock cardList={cardList}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.marketThingsOfOneUser,
  filtrationByUser: state.main.filterbyUser.id,
});

const mapDispatchToProps = dispatch => ({
  getMarketThingsOfOneUser: (user) => dispatch(getMarketThingsOfOneUser(user)),
  addThingForExchange: (thingForExchange) => dispatch(addThingForExchange(thingForExchange)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketFilteredByUser);