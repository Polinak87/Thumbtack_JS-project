import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../../components/Hero';
import { deleteThingForExchange } from '../../../store/actions/things';
import { createApplication } from '../../../store/actions/applications';
import { getUserThings } from '../../../store/actions/things';
import CardBlock from '../../../components/CardBlock';

class ThingsForExchange extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getUserThings();
  }

  componentWillUnmount() {
    const { deleteThingForExchange } = this.props;
    deleteThingForExchange();
  }

  onClick(id) {
    const idThingOffered = id;
    const { createApplication, thingForExchange } = this.props;
    const { idThingDesired, idUserAnswer } = thingForExchange;
    createApplication(idThingOffered, idThingDesired, idUserAnswer);
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
            onClick={this.onClick} />
        </div>
      )
    };

    return (
      <>
        <br />
        <Hero text='Choose thing for exchange' type="hero is-info" />
        <CardBlock cardList={cardList} />
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
  createApplication: (idThingOffered, idThingDesired, idUserAnswer) => dispatch(createApplication(idThingOffered, idThingDesired, idUserAnswer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThingsForExchange);