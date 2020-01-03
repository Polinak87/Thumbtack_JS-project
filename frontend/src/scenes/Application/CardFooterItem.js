import React from 'react';
import ThingInfo from '../../components/Card/ThingInfo';

export default function CardFooterItem({ userThing, title }) {
  const { Thing:thing, id, onMarket, onMarketAt } = userThing;
  const { image, name, description, Category:category } = thing;
  const { name: categoryName } = category;
  return (
    <div className="card-footer-item">
      <div className="card-is-full">
        <p>{title}</p>
        <br />
        <ThingInfo
          id={id}
          image={image}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt}
        />
      </div>
    </div>
  );
}
