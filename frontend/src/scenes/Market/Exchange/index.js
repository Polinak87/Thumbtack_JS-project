import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../../components/Hero';
import { deleteThingForExchange } from '../../../store/actions/things';
import { createApplication } from '../../../store/actions/applications';
import { getUserThings } from '../../../store/actions/things';
import CardBlock from '../../../components/CardBlock';
import Column from '../../../components/Column';

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
    const { userThingsMap } = this.props;
    const userThingsArray = Array.from(userThingsMap.values());

    let cardList = userThingsArray.map(UserThing => {
      const { Thing, id, onMarket, onMarketAt } = UserThing;
      const { image, name, description, Category } = Thing;
      const { name: categoryName } = Category;
      return (
        <Column key={UserThing.id}>
          <Card
            image={image}
            id={id}
            name={name}
            description={description}
            categoryName={categoryName}
            onMarket={onMarket}
            onMarketAt={onMarketAt}
            onClick={this.onClick}
          />
        </Column>
      );
    });

    return (
      <div>
        <br />
        <Hero text="Choose thing for exchange" type="hero is-info" />
        <CardBlock cardList={cardList} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userThingsMap: state.things.userThings,
  thingForExchange: state.things.thingForExchange,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  getUserThings: () => dispatch(getUserThings()),
  deleteThingForExchange: () => dispatch(deleteThingForExchange()),
  createApplication: (idThingOffered, idThingDesired, idUserAnswer) =>
    dispatch(createApplication(idThingOffered, idThingDesired, idUserAnswer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThingsForExchange);
