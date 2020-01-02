import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button, { green, red, large } from '../../components/Button';

export default function Card(props) {
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
  } = props;

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
