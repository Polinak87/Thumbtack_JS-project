import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button, { green, red, large } from '../../components/Button';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      image,
      name,
      description,
      categoryName,
      onMarket,
      onMarketAt,
      onClickAdd,
      onClickRemove,
    } = this.props;

    let button;
    if (onMarket) {
      button = (
        <Button className={`${large} ${red}`} id={id} onClick={onClickRemove}>
          Remove from market
        </Button>
      );
    } else {
      button = (
        <Button className={`${large} ${green}`} id={id} onClick={onClickAdd}>
          Add to market
        </Button>
      );
    }

    return (
      <div className="card">
        <ThingInfo
          image={image}
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt}
        />
        {button}
      </div>
    );
  }
}
