import React from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card';
import Hero, { aquamarine } from '../../components/Hero';
import ColumnsMultiline from '../../components/ColumnsMultiline';
import Button, { green, red, large } from '../../components/Button';
import {
  getUserThings,
  addThingToMartet,
  removeThingFromMartet,
} from '../../store/actions/things';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  componentDidMount() {
    const { getUserThings } = this.props;
    getUserThings();
  }

  onClickAdd(id) {
    const { addThingToMartet } = this.props;
    addThingToMartet(id);
  }

  onClickRemove(id) {
    const { removeThingFromMartet } = this.props;
    removeThingFromMartet(id);
  }

  render() {
    const { userThingsMap } = this.props;
    const userThingsArray = Array.from(userThingsMap.values());

    let cardList = userThingsArray.map(userThing => {
      const { Thing:thing, id, onMarket, onMarketAt } = userThing;
      const { image, name, description, Category:category } = thing;
      const { name: categoryName } = category;
      let button;

      if (onMarket) {
        button = (
          <Button className={`${large} ${red}`} id={id} onClick={this.onClickRemove}>
            Remove from market
          </Button>
        );
      } else {
        button = (
          <Button className={`${large} ${green}`} id={id} onClick={this.onClickAdd}>
            Add to market
          </Button>
        );
      }

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
        <Hero className={aquamarine} text="Your inventory"/>
        <ColumnsMultiline>{cardList}</ColumnsMultiline>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userThingsMap: state.things.userThings,
});

const mapDispatchToProps = dispatch => ({
  getUserThings: () => dispatch(getUserThings()),
  addThingToMartet: id => dispatch(addThingToMartet(id)),
  removeThingFromMartet: id => dispatch(removeThingFromMartet(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
