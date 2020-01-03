import React from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Card';
import Hero, { blue } from '../../../components/Hero';
import ColumnsMultiline from '../../../components/ColumnsMultiline';
import Button, { green, red, large } from '../../../components/Button';
import { deleteThingForExchange, getUserThings } from '../../../store/actions/things';
import { createApplication } from '../../../store/actions/applications';

class ThingsForExchange extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { getUserThings } = this.props;
    getUserThings();
  }

  componentWillUnmount() {
    const { deleteThingForExchange } = this.props;
    deleteThingForExchange();
  }

  onClick(id) {
    const { createApplication, thingForExchange } = this.props;
    const { idThingDesired, idUserAnswer } = thingForExchange;
    const idThingOffered = id;
    createApplication(idThingOffered, idThingDesired, idUserAnswer);
  }

  render() {
    const { userThingsMap } = this.props;
    const userThingsArray = Array.from(userThingsMap.values());

    let cardList = userThingsArray.map(userThing => {
      const { Thing:thing, id, onMarket, onMarketAt } = userThing;
      const { image, name, description, Category:category } = thing;
      const { name: categoryName } = category;

      const button = (
        <Button className={`${large} ${green}`} id={id} onClick={this.onClick}>
          Choose
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
        onMarket={onMarket}
        onMarketAt={onMarketAt}
        button={button}
        />
      );
    });

    return (
      <div>
        <br />
        <Hero className={blue} text="Choose thing for exchange"/>
        <ColumnsMultiline>{cardList}</ColumnsMultiline>
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
