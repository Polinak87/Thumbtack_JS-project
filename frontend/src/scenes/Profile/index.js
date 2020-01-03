import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Hero, { aquamarine } from '../../components/Hero';
import CardBlock from '../../components/CardBlock';
import Column from '../../components/Column';
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
            onClickAdd={this.onClickAdd}
            onClickRemove={this.onClickRemove}
          />
        </Column>
      );
    });

    return (
      <div>
        <br/>
        <Hero className={aquamarine} text="Your inventory"/>
        <CardBlock cardList={cardList}/>
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
