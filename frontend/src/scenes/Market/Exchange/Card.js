import React from 'react';
import ThingInfo from '../../../components/ThingInfo';
import Button, { green, large } from '../../../components/Button';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      image,
      id,
      name,
      description,
      categoryName,
      onMarket,
      onMarketAt,
      onClick,
    } = this.props;

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
        <Button className={`${large} ${green}`} id={id} onClick={onClick}>
          Choose
        </Button>
      </div>
    );
  }
}
