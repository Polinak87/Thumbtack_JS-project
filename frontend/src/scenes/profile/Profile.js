import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../components/Hero';
import CardBlock from '../../components/CardBlock';
import { getUserThings } from '../../store/actions/userThings';
import { addThingToMartet } from '../../store/actions/userThings';
import { removeThingFromMartet } from '../../store/actions/userThings';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  componentDidMount() {
    this.props.getUserThings();
  }

  onClickAdd(id) {
    this.props.addThingToMartet(id);
  }

  onClickRemove(id) {
    this.props.removeThingFromMartet(id);
  }

  render() {
    let cardList = [];
    const { value } = this.props;
    for (let UserThing of value.values()) {
      const { Thing, id, onMarket, onMarketAt } = UserThing;
      const { image, name, description, Category } = Thing;
      const { name: categoryName } = Category;
      cardList.push(
        <div className="column is-one-quarter" key={UserThing.id}>
          <Card
            image={image}
            id={id}
            name={name}
            description={description}
            categoryName={categoryName}
            onMarket={onMarket}
            onMarketAt={onMarketAt}
            onClickAdd={this.onClickAdd}
            onClickRemove={this.onClickRemove} />
        </div>
      )
    };

    return (
      <>
        <br />
        <Hero text='Your inventory' type="hero is-primary" />
        <CardBlock cardList={cardList} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.userThings,
});

const mapDispatchToProps = dispatch => ({
  getUserThings: () => dispatch(getUserThings()),
  addThingToMartet: (id) => dispatch(addThingToMartet(id)),
  removeThingFromMartet: (id) => dispatch(removeThingFromMartet(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
