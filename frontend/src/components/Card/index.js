import React from 'react';
import ThingInfo from './ThingInfo';
import Column from '../Columns/Column';

export default function Card(props) {
  const {
    header,
    button,
    id,
    image,
    name,
    description,
    categoryName,
    onMarket,
    onMarketAt,
  } = props;

  return (
    <Column>
      <div className="card">
        {header}
        <ThingInfo
          id={id}
          image={image}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt}
        />
        {button}
      </div>
    </Column>
  );
}
