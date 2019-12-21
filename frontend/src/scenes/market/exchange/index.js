import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../components/Hero';
import store from '../../store/index';
import { deleteThingForExchange } from '../../store/actions/things';
import { addMessage } from '../../store/actions/main';
import { getUserThings } from '../../store/actions/things';
import CardBlock from '../../components/CardBlock';

class ThingsForExchange extends React.Component {
  constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getUserThings();
  }

  componentWillUnmount() {
    const { deleteThingForExchange } = this.props;
    deleteThingForExchange();
  }

  //поправвить после того, как будет исправлен onClick на market
  onClick(id) {
    event.preventDefault();
    const idThingOffered = id;
    const { idThingDesired, idUserAnswer } = this.props.thingForExchange;
    axios.post('/api/createapplication', { idThingOffered, idThingDesired, idUserAnswer })
    .then((response) => {
      if (response.status === 200) {
        store.dispatch(addMessage({text: ' Your application is sent. You can track it in your outbox applications.'}));
      }
    });
  }

  render() {
    let cardList = [];
    for (let UserThing of this.props.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={UserThing.id}>
          <Card
            image={UserThing.Thing.image}
            id={UserThing.id}
            name={UserThing.Thing.name}
            description={UserThing.Thing.description}
            categoryName={UserThing.Thing.Category.name}
            onMarket={UserThing.onMarket}
            onMarketAt={UserThing.onMarketAt}
            updateData={this.updateData}
            onClick={this.onClick} />
        </div>
      )
    };

    return (
      <>
        <br />
        <Hero text='Choose thing for exchange' type="hero is-info"/>
        <CardBlock cardList={cardList}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.userThings,
  thingForExchange: state.things.thingForExchange,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  getUserThings: () => dispatch(getUserThings()),
  deleteThingForExchange: () => dispatch(deleteThingForExchange()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThingsForExchange);