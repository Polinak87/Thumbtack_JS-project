import React from 'react';
import ThingInfo from '../ThingInfo';
import Button, { green, large } from '../../../components/Button';

export default function Card(props) {
  const {
    image,
    id,
    name,
    description,
    categoryName,
    onMarket,
    onMarketAt,
    onClick,
  } = props;

  return (
    <div className="card">
      {header}
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



    // <div className="card">
    //   <ThingInfo
    //     image={image}
    //     id={id}
    //     name={name}
    //     description={description}
    //     categoryName={categoryName}
    //     onMarket={onMarket}
    //     onMarketAt={onMarketAt}
    //   />
    //   <Button className={`${large} ${green}`} id={id} onClick={onClick}>
    //     Choose
    //   </Button>
    // </div>
  );
}